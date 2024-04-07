// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import handleEditorReplace from './extension-handler/editor-submenu-handler';
import { handleQuickPick } from './extension-handler/quick-pick-handler';
import { SupportCase, commands } from './type-definition/SupportCaseType';
import { createStatusBarItem, updateStatusBarItemVisable } from './extension-handler/status-bar-handler';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "variable-conversion" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('variable-conversion.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from variable-conversion!');
	// });

	let selectTextLength = 0;
	createStatusBarItem();
	vscode.window.onDidChangeActiveTextEditor(event => {
		updateStatusBarItemVisable(selectTextLength);
	});

	// 用于判断是否展示右键菜单
	vscode.window.onDidChangeTextEditorSelection(event => {
		const text = event.textEditor.document.getText(event.selections[0]);
		// console.log('text.length', text.length);
		vscode.commands.executeCommand('setContext', '_textSelectionLength', text.length);

		selectTextLength = text.length;
		updateStatusBarItemVisable(selectTextLength);
	});

	// 初始(VSCode 插件初始化)时也判断一次 (考虑上次关闭 VSCode 有选区，重新打开后 VSCode 回复选区但用户未重新切换选区的场景)
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let document = editor.document;
		let selection = editor.selection;
		// 获取选中的文本
		let text = document.getText(selection);
		vscode.commands.executeCommand('setContext', '_textSelectionLength', text.length);

		selectTextLength = text.length;
		updateStatusBarItemVisable(selectTextLength);
	} else {
		// vscode.window.showInformationMessage('editor is undefined');
		console.log('editor is undefined');
	}

	for (const { command, targetCase } of commands) {
		let disposable = vscode.commands.registerCommand(command, () => {
			handleEditorReplace(targetCase);
		});
		context.subscriptions.push(disposable);
	}

	let convertCaseDisposable = vscode.commands.registerCommand('variable-conversion.convertCase', handleQuickPick);
	context.subscriptions.push(convertCaseDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
