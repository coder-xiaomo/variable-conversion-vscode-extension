import * as vscode from 'vscode';
import QuickPickItemEx from "../type-definition/QuickPickItemExType";
import { quickPickSupportCases } from '../type-definition/SupportCaseType';
import { TransformTextResult } from '../type-definition/TransformTextResultType';
import { transformMutliLineText } from '../main-code/transform';
import { EOL } from '../type-definition/EOLType';
import { caseConversion } from '../main-code/conversion';

const QuickPickLabelMaxLength = 60;

interface RecommendItem {
    conversionText: string
    transforTo: string[]
    keyword: string[]
}

/**
 * 弹出的提示
 */
function generateOptionsBasedOnText(text: string, eol: EOL): Array<QuickPickItemEx> {
    // Cut text 切割文本
    const results: Array<TransformTextResult> = transformMutliLineText(text);

    const mergeResultList: Array<RecommendItem> = [];
    for (const quickPick of quickPickSupportCases) {
        const conversionResult: string = caseConversion(quickPick.type, text, eol, results);
        const recommendItem: RecommendItem | undefined = mergeResultList.find(item => item.conversionText === conversionResult);

        if (recommendItem === undefined) {
            let item: RecommendItem = {
                conversionText: conversionResult,
                transforTo: [quickPick.shortName], // quickPick.name
                keyword: quickPick.keyword,
            };
            mergeResultList.push(item);
            continue;
        }

        recommendItem.transforTo.push(quickPick.shortName); // quickPick.name
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
        if (text === recommendItem.conversionText) {
            continue; // 如果转换后与转换前相同，那么跳过这一项
        }
        const conversionTextForDisplay = recommendItem.conversionText.trim();
        let quickPickItem: QuickPickItemEx = {
            label: conversionTextForDisplay.length >= QuickPickLabelMaxLength
                ? (conversionTextForDisplay.substring(0, QuickPickLabelMaxLength - 3) + '...')
                : conversionTextForDisplay,
            description: `转换为 ${recommendItem.transforTo.join(' / ')}`,
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

    let document = editor.document;
    let selection = editor.selection;
    let eol: EOL = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';

    // 获取选中的文本
    let text = document.getText(selection);

    if (text.length === 0) {
        vscode.window.showInformationMessage('请选择需要转换的变量后重试\nPlease select the variable you want to convert and try again.');
        return;
    }

    // 基于选中的文本生成选项
    const options = generateOptionsBasedOnText(text, eol);
    // 显示推荐项列表
    vscode.window.showQuickPick(options, {
        matchOnDetail: true,
        title: '请选择需要转换的命名类型...',
        placeHolder: '点击转换，输入关键词可快速选择'
    }).then(pickItem => {
        if (!editor || pickItem === undefined) {
            return;
        }

        // 处理用户的选择
        // vscode.window.showInformationMessage(`你选择了: ${JSON.stringify(selection)}`);

        const converted = pickItem.value;

        // 当转换后文本与转换前相同时，跳过转换，避免形成 Ctrl + Z 撤销历史记录
        if (converted === text) {
            console.log('selection text is same to converted text, skip replace contents.');
            return;
        }

        // 替换文本
        console.log('replace selection text', text, 'to', converted);
        editor.edit(editBuilder => {
            editBuilder.replace(selection, converted);
        });
    });
}