import * as vscode from 'vscode';
import QuickPickItemEx from "../type-definition/QuickPickItemExType";

/**
 * 弹出的提示
 */
function generateOptionsBasedOnText(text: string): Array<QuickPickItemEx> {
    // 根据文本生成选项的逻辑
    return [
        { label: '输入对应项下方任一关键词可快速选择', kind: vscode.QuickPickItemKind.Separator },
        { label: text.toUpperCase(), description: '转换为大写', detail: '关键词：DaXie 大写 UpperCase', value: text.toUpperCase() },
        { label: 'Group 2', kind: vscode.QuickPickItemKind.Separator },
        { label: text.toLowerCase(), description: '转换为小写', value: text.toLowerCase() },
        { label: text.toLowerCase(), description: '转换为小写', value: text.toLowerCase() },
        { label: text.toLowerCase(), description: '转换为下划线', detail: '关键词：_', value: text.toLowerCase() },
        { label: text.toLowerCase(), description: '转换为连字符', detail: '关键词：-', value: text.toLowerCase() },
    ];
}

export function handleQuickPick() {
    // 获取当前编辑器
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let document = editor.document;
    let selection = editor.selection;

    // 获取选中的文本
    let text = document.getText(selection);

    if (text.length === 0) {
        vscode.window.showInformationMessage('Please select the variable you want to convert and try again.\n请选择需要转换的变量后重试');
        return;
    }

    // 基于选中的文本生成选项
    const options = generateOptionsBasedOnText(text);
    // 显示推荐项列表
    vscode.window.showQuickPick(options, {
        matchOnDetail: true,
        title: '标题',
        placeHolder: '输入对应项下方任一关键词可快速选择！'
    }).then(selection => {
        if (selection) {
            // 处理用户的选择
            vscode.window.showInformationMessage(`你选择了: ${selection}`);
        }
    });
}