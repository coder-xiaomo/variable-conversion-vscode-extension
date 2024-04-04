import * as vscode from 'vscode';
import * as TextConversion from '../main-code/variable-conversion';
import { ConvertFunction, EOL } from '../type-definition/convert-function-type';

/**
 * 编辑器右键菜单
 *
 * @param convertFunction
 * @returns
 */
const handleEditorReplace = (convertFunction: ConvertFunction) => {
    // 获取当前编辑器
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    console.log('============ start convert ============');
    let document = editor.document;
    let selection = editor.selection;
    let eol: EOL = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';

    // 获取选中的文本
    let text = document.getText(selection);

    // 转换文本
    const converted = convertFunction(text, eol);
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
    console.log('============ finish convert ============');
};

export default handleEditorReplace;
