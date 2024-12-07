import * as vscode from 'vscode';
import { EOL } from '../types/EOLType';
import { caseConversion } from '../core/variable-convert/conversion';
import { SupportCase } from '../core/variable-convert/types/SupportCaseType';
import { isStringArrayEqual } from '../utils/utils';

/**
 * 编辑器右键菜单
 *
 * @param convertFunction
 * @returns
 */
const handleEditorReplace = (targetCase: SupportCase) => {
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

    // 转换文本
    const convertedList = textList.map(text => caseConversion(targetCase, text, eol));
    console.log('convertedList', convertedList);

    // 无法转换时，跳过转换
    if (convertedList.filter(converted => converted !== undefined).length === 0) {
        console.log('converted text is undefined, skip replace contents.');
        return;
    }

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
};

export default handleEditorReplace;
