// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import handleEditorReplace from './extension-handler/editor-submenu-handler';
import { handleQuickPick } from './extension-handler/quick-pick-handler';
import { SupportCase } from './type-definition/SupportCaseType';

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

	// 用于判断是否展示右键菜单
	vscode.window.onDidChangeTextEditorSelection(event => {
		const text = event.textEditor.document.getText(event.selections[0]);
		// console.log('text.length', text.length);
		vscode.commands.executeCommand('setContext', '_textSelectionLength', text.length);
	});

	// 初始(VSCode 插件初始化)时也判断一次 (考虑上次关闭 VSCode 有选区，重新打开后 VSCode 回复选区但用户未重新切换选区的场景)
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let document = editor.document;
		let selection = editor.selection;
		// 获取选中的文本
		let text = document.getText(selection);
		vscode.commands.executeCommand('setContext', '_textSelectionLength', text.length);
	} else {
		vscode.window.showInformationMessage('editor is undefined');
	}

	const commands: Array<{ command: string; targetCase: SupportCase }> = [
		{ command: 'variable-conversion.toCamelCase', targetCase: SupportCase.CAMEL_CASE },
		{ command: 'variable-conversion.toPascalCase', targetCase: SupportCase.PASCAL_CASE },
		{ command: 'variable-conversion.toSnakeCase', targetCase: SupportCase.SNAKE_CASE },
		{ command: 'variable-conversion.toSnakeUpperCase', targetCase: SupportCase.SNAKE_UPPER_CASE },
		{ command: 'variable-conversion.toSnakePascalCase', targetCase: SupportCase.SNAKE_PASCAL_CASE },
		{ command: 'variable-conversion.toSnakeCamelCase', targetCase: SupportCase.SNAKE_CAMEL_CASE },
		{ command: 'variable-conversion.toKebabCase', targetCase: SupportCase.KEBAB_CASE },
		{ command: 'variable-conversion.toKebabUpperCase', targetCase: SupportCase.KEBAB_UPPER_CASE },
		{ command: 'variable-conversion.toKebabPascalCase', targetCase: SupportCase.KEBAB_PASCAL_CASE },
		{ command: 'variable-conversion.toKebabCamelCase', targetCase: SupportCase.KEBAB_CAMEL_CASE },
		{ command: 'variable-conversion.toLowerCase', targetCase: SupportCase.LOWER_CASE },
		{ command: 'variable-conversion.toUpperCase', targetCase: SupportCase.UPPER_CASE },
	];

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
