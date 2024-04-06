import * as vscode from 'vscode';

// docs: https://code.visualstudio.com/api/references/vscode-api#StatusBarItem

let statusBar: vscode.StatusBarItem;

/**
 * @since 2024-04-07
 */
export function createStatusBarItem() {
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBar.text = '$(find-replace)字符串转换';
    statusBar.command = 'variable-conversion.convertCase';
    // statusBar.color = 'red';
    // statusBar.show();
}

/**
 * @since 2024-04-07
 */
export function updateStatusBarItemVisable(selectTextLength: number) {
    if (!statusBar) {
        return;
    }

    let editor = vscode.window.activeTextEditor;
    if (editor && selectTextLength > 0) {
        statusBar.show();
        return;
    }
    statusBar.hide();
}