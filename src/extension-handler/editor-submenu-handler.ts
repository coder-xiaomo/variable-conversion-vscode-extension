import * as vscode from 'vscode';
import { EOL } from '../type-definition/EOLType';
import { caseConversion } from '../main-code/conversion';
import { SupportCase } from '../type-definition/SupportCaseType';

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

    let document = editor.document;
    let selection = editor.selection;
    let eol: EOL = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';

    // 获取选中的文本
    let text = document.getText(selection);

    // 转换文本
    const converted = caseConversion(targetCase, text, eol);
    console.log('converted', converted);

    // 无法转换时，跳过转换
    if (converted === undefined) {
        console.log('converted text is undefined, skip replace contents.');
        return;
    }

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
};

export default handleEditorReplace;
