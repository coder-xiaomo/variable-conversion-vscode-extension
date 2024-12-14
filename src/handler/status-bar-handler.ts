import * as vscode from 'vscode';

// docs: https://code.visualstudio.com/api/references/vscode-api#StatusBarItem

let statusBarItemList: Array<vscode.StatusBarItem> = [];

/**
 * 创建状态栏按钮
 *
 * @since 2024-04-07
 */
export function createStatusBarItem() {
	// 变量转换状态栏 2024.04.07
    const createVariableConvertStatusBarItem = () => {
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        // Icon Listing docs: https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
        statusBarItem.text = '$(find-replace)变量转换';
        statusBarItem.command = 'variable-conversion.convertCase';
        // statusBarItem.color = 'red';
        // statusBarItem.show();
        return statusBarItem;
    };
	// 路径转换状态栏 2024.12.14
    const createPathConvertStatusBarItem = () => {
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        statusBarItem.text = '$(sync-ignored)路径转换'; // italic symbol-null
        statusBarItem.command = 'variable-conversion.convertPath';
        statusBarItemList.push(statusBarItem);
        return statusBarItem;
    };

    statusBarItemList.push(
        createVariableConvertStatusBarItem(),
        createPathConvertStatusBarItem(),
    );
}

/**
 * 判断是否展示状态栏按钮
 *
 * @since 2024-04-07
 */
export function updateStatusBarItemVisable(selectTextLength: number) {
    let editor = vscode.window.activeTextEditor;
    if (editor && selectTextLength > 0) {
        statusBarItemList.forEach(statusBarItem => {
            statusBarItem.show();
        });
        return;
    }
    statusBarItemList.forEach(statusBarItem => {
        statusBarItem.hide();
    });
}