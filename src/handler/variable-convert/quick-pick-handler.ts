import * as vscode from 'vscode';
import QuickPickItemEx from "../types/QuickPickItemExType";
import { QuickPickSupportCaseItem, quickPickSupportCases } from '../../core/variable-convert/types/SupportVariableCaseType';
import { TransformTextResult } from '../../types/TransformTextResultType';
import { transformMultiSelectionText } from '../../utils/transform';
import { EOL } from '../../types/EOLType';
import { caseConversion } from '../../core/variable-convert/conversion';
import { isStringArrayEqual } from '../../utils/utils';
import { getUserConfigurations } from '../../utils/user-configuration';

const QuickPickLabelMaxLength = 60;

interface RecommendItem {
    conversionText: Array<string>
    transformTo: string[]
    keyword: string[]
}

/**
 * 弹出的提示
 *
 * @param textList
 * @param eol
 * @param enabledQuickPickSupportCases
 * @returns
 */
function generateOptionsBasedOnText(textList: string[], eol: EOL, enabledQuickPickSupportCases: Array<QuickPickSupportCaseItem>): Array<QuickPickItemEx> {
    // Cut text 切割文本
    const resultsList: Array<TransformTextResult[]> = transformMultiSelectionText(textList);

    const mergeResultList: Array<RecommendItem> = [];
    for (const quickPick of enabledQuickPickSupportCases) {
        const conversionResults: Array<string> = [];
        for (let i = 0; i < textList.length; i++) {
            const text = textList[i];
            const results = resultsList[i];
            const conversionResult: string = caseConversion(quickPick.type, text, eol, results);
            conversionResults.push(conversionResult);
        }
        const recommendItem: RecommendItem | undefined = mergeResultList.find(item => isStringArrayEqual(item.conversionText, conversionResults));

        if (recommendItem === undefined) {
            let item: RecommendItem = {
                conversionText: conversionResults,
                transformTo: [quickPick.shortName], // quickPick.name
                keyword: quickPick.keyword,
            };
            mergeResultList.push(item);
            continue;
        }

        recommendItem.transformTo.push(quickPick.shortName); // quickPick.name
        recommendItem.keyword = Array.from(new Set(recommendItem.keyword.concat(quickPick.keyword))); // 关键词去重
    }

    // 根据文本生成选项的逻辑
    const quickPickList = [
        // { label: '输入对应项下方任一关键词可快速选择', kind: vscode.QuickPickItemKind.Separator },
        // { label: text.toUpperCase(), description: '转换为大写', detail: '关键词：DaXie 大写 UpperCase', value: text.toUpperCase() },
        // { label: 'Group 2', kind: vscode.QuickPickItemKind.Separator },
        // { label: text.toLowerCase(), description: '转换为小写', value: text.toLowerCase() },
        // { label: text.toLowerCase(), description: '转换为小写', value: text.toLowerCase() },
        // { label: text.toLowerCase(), description: '转换为下划线', detail: '关键词：_', value: text.toLowerCase() },
        // { label: text.toLowerCase(), description: '转换为连字符', detail: '关键词：-', value: text.toLowerCase() },
    ];

    for (const recommendItem of mergeResultList) {
        if (isStringArrayEqual(textList, recommendItem.conversionText)) {
            continue; // 如果转换后与转换前相同，那么跳过这一项
        }
        const conversionTextForDisplay = recommendItem.conversionText.join(' ').replace(/\s+/g, " "); // 友好展示 将连续空格 \n \t 等替换为单一空格
        let quickPickItem: QuickPickItemEx = {
            label: conversionTextForDisplay.length >= QuickPickLabelMaxLength
                ? (conversionTextForDisplay.substring(0, QuickPickLabelMaxLength - 3) + '...')
                : conversionTextForDisplay,
            description: `转换为 ${recommendItem.transformTo.join(' / ')}`,
            detail: `关键词 ${recommendItem.keyword.join(' ')}`,
            value: recommendItem.conversionText,
        };
        quickPickList.push(quickPickItem);
    }
    return quickPickList;
}

export function handleQuickPick() {
    // 获取当前编辑器
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const document = editor.document;
    const selections = editor.selections;
    const eol: EOL = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';

    // 获取选中的文本
    const textList = selections.map(selection => document.getText(selection));

    if (textList.filter(text => text.length > 0).length === 0) {
        vscode.window.showInformationMessage('请选择需要转换的变量后重试\nPlease select the variable you want to convert and try again.');
        return;
    }

    // issue: #1 https://github.com/coder-xiaomo/variable-conversion-vscode-extension/issues/1
    // 获取用户配置
    const enabledFormats = getUserConfigurations<Record<string, boolean>>('enabledFormats') || {};
    // 排除禁用的选项
    const enabledQuickPickSupportCases = [];
    for (const quickPick of quickPickSupportCases) {
        if (enabledFormats[quickPick.settingsKey] === false) {
            continue;
        }
        enabledQuickPickSupportCases.push(quickPick);
    }
    if (enabledQuickPickSupportCases.length === 0) {
        vscode.window.showInformationMessage('所有格式都已被配置为禁用，请修改配置 `variable-conversion.enabledFormats` 后重试\nAll formats have been configured to disable. Modify the `variable-conversion.enabledFormats` configuration and try again.');
        return;
    }

    // 基于选中的文本生成选项
    const options = generateOptionsBasedOnText(textList, eol, enabledQuickPickSupportCases);
    if (options.length === 0) {
        vscode.window.showInformationMessage('所选内容暂无可选转换，请尝试重新选择\nNo conversion candidates are available for the selected content, please try to select another text.');
        return;
    }

    // 显示推荐项列表
    vscode.window.showQuickPick(options, {
        matchOnDetail: true,
        title: '请选择需要转换的命名方式...',
        placeHolder: '点击转换，输入关键词可快速选择'
    }).then(pickItem => {
        if (!editor || pickItem === undefined) {
            return;
        }

        const convertedList = pickItem.value;

        // 当转换后文本与转换前相同时，跳过转换，避免形成 Ctrl + Z 撤销历史记录
        if (isStringArrayEqual(convertedList, textList)) {
            console.log('selection text is same to converted text, skip replace contents.');
            return;
        }

        // 替换文本
        console.log('replace selection text', textList, 'to', convertedList);
        editor.edit(editBuilder => {
            for (let i = 0; i < selections.length; i++) {
                const selection = selections[i];
                const converted = convertedList[i];
                editBuilder.replace(selection, converted);
            }
        });
    });
}
