import * as vscode from 'vscode';
import { EOL } from "../../type-definition/EOLType";
import { cyclicConvertCaseOrder } from "./types/SupportCaseType";
import { caseConversion } from "./conversion";
import { isStringArrayEqual, stringListArrayDuplicateRemoval } from '../../utils/utils';
import { getUserConfigurations } from '../../utils/user-configuration';

interface UserSelection {
    currentEol: EOL
    currentSelections?: readonly vscode.Selection[]
    currentSelectionsText: string[]
    currentIndex: number
    isConverted: boolean
    conversionsTarget: Array<string[]>
    lastConvertedSelectionsText: string[] // 按快捷键后转换的值（如果下次触发 onUserSelectionUpdated 后传入值是这个，那么跳过，避免丢失当前循环转换记录）
}

const userSelection: UserSelection = {
    currentEol: '\n',
    // currentSelections: undefined,
    currentSelectionsText: [],
    currentIndex: 0,
    isConverted: false,
    conversionsTarget: [], // 转换后去重 剩余转换目标
    lastConvertedSelectionsText: [],
};

export function onUserSelectionUpdated(selections: readonly vscode.Selection[], textList: string[], eol: EOL): void {
    userSelection.currentSelections = selections;
    if (textList.length !== 0 && isStringArrayEqual(textList, userSelection.lastConvertedSelectionsText)) {
        // console.log('skip onUserSelectionUpdated');
        return;
    }
    // console.log('onUserSelectionUpdated', textList, userSelection.lastConvertedSelectionsText);
    userSelection.currentEol = eol;
    userSelection.currentSelectionsText = textList;
    userSelection.currentIndex = 0;
    userSelection.isConverted = false;
    userSelection.conversionsTarget = [textList];
    userSelection.lastConvertedSelectionsText = textList;
}

export function previousOne() {
    lazyConvert();
    const length = userSelection.conversionsTarget.length;
    const oldIndex = userSelection.currentIndex;
    const newIndex = oldIndex === 0 ? (length - 1) : (oldIndex - 1);
    userSelection.currentIndex = newIndex;
    console.log('previousOne oldIndex', oldIndex, 'newIndex', newIndex);
    replaceTextEditorSelectedText();
}

export function nextOne() {
    lazyConvert();
    const length = userSelection.conversionsTarget.length;
    const oldIndex = userSelection.currentIndex;
    const newIndex = oldIndex >= length - 1 ? 0 : (oldIndex + 1);
    userSelection.currentIndex = newIndex;
    console.log('nextOne oldIndex', oldIndex, 'newIndex', newIndex);
    replaceTextEditorSelectedText();
}

function lazyConvert() {
    if (userSelection.isConverted) {
        return;
    }

    // 获取用户配置
    const disableFormatList = getUserConfigurations<Array<string>>('disableFormat') || [];

    const textList = userSelection.currentSelectionsText;
    // vscode.window.showInformationMessage('lazyConvert' + textList.join('\n'));
    const eol = userSelection.currentEol;
    const conversionsTarget: Array<string[]> = [textList];
    for (const cyclicConvertCase of cyclicConvertCaseOrder) {
        // issue: #1 https://github.com/coder-xiaomo/variable-conversion-vscode-extension/issues/1
        // 跳过禁用的目标格式
        if (disableFormatList.includes(cyclicConvertCase.settingsKey)) {
            continue;
        }

        // 每一个类型
        const conversionsTargetItem: string[] = [];
        for (const line of textList) {
            // 选中区块的每一行
            const conversionResult: string = caseConversion(cyclicConvertCase.type, line, eol);
            conversionsTargetItem.push(conversionResult);
        }
        conversionsTarget.push(conversionsTargetItem);
    }

    // 按数组去重
    const noDuplicate = stringListArrayDuplicateRemoval(conversionsTarget);
    // console.log('noDuplicate', noDuplicate);

    userSelection.conversionsTarget = noDuplicate;
    userSelection.isConverted = true;
}

function replaceTextEditorSelectedText() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        const selections = userSelection.currentSelections || [];
        const textList = userSelection.conversionsTarget[userSelection.currentIndex];
        console.log('selections', selections, 'textList', textList);
        editor.edit(editBuilder => {
            for (let i = 0; i < selections.length; i++) {
                const selection = selections[i];
                const converted = textList[i];
                editBuilder.replace(selection, converted);
            }
        });
        userSelection.lastConvertedSelectionsText = textList;
    }
}