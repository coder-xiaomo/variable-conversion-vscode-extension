// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as TextConversion from './main-code/variable-conversion';
import { ConvertFunction, EOL } from './type-definition/convert-function-type';
import handleEditorReplace from './extension-handler/editor-submenu-handler';
import QuickPickItemEx from './type-definition/extended-quick-pick-item-type';

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

	const commands: Array<{ command: string; convertFunction: ConvertFunction }> = [
		{ command: 'variable-conversion.toCamelCase', convertFunction: TextConversion.toCamelCase },
		{ command: 'variable-conversion.toPascalCase', convertFunction: TextConversion.toPascalCase },
		{ command: 'variable-conversion.toKebabCase', convertFunction: TextConversion.toKebabCase },
		{ command: 'variable-conversion.toCamelKebabCase', convertFunction: TextConversion.toCamelKebabCase },
		{ command: 'variable-conversion.toKebabUpperCase', convertFunction: TextConversion.toKebabUpperCase },
		// { command: 'variable-conversion.toSnakeCase', convertFunction: TextConversion.toSnakeCase },
		// { command: 'variable-conversion.toCamelSnakeCase', convertFunction: TextConversion.toCamelSnakeCase },
		// { command: 'variable-conversion.toSnakeUpperCase', convertFunction: TextConversion.toSnakeUpperCase },
		{ command: 'variable-conversion.toUpperCase', convertFunction: TextConversion.toUpperCase },
		{ command: 'variable-conversion.toLowerCase', convertFunction: TextConversion.toLowerCase },
	];

	for (const { command, convertFunction } of commands) {
		let disposable = vscode.commands.registerCommand(command, () => {
			handleEditorReplace(convertFunction);
		});
		context.subscriptions.push(disposable);
	}


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

	let convertCaseDisposable = vscode.commands.registerCommand('variable-conversion.convertCase', () => {
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
	});
	context.subscriptions.push(convertCaseDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
