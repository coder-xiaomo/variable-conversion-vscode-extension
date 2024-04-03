// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as TextConversion from './main-code/variable-conversion';
import { ConvertFunction, EOL } from './type-definition/convert-function-type';

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

	const commands: Array<{ command: string; convertFunction: ConvertFunction }> = [
		{ command: 'extension.toCamelCase', convertFunction: TextConversion.toCamelCase },
		{ command: 'extension.toPascalCase', convertFunction: TextConversion.toPascalCase },
		{ command: 'extension.toUpperCase', convertFunction: TextConversion.toUpperCase },
		{ command: 'extension.toLowerCase', convertFunction: TextConversion.toLowerCase },
	];

	for (const { command, convertFunction } of commands) {
		let disposable = vscode.commands.registerCommand(command, () => {
			handleEditorReplace(convertFunction);
		});
		context.subscriptions.push(disposable);
	}

	interface ExtendedQuickPickItem extends vscode.QuickPickItem {
		value: string;
	}

	/**
	 * 弹出的提示
	 */
	function generateOptionsBasedOnText(text: string): Array<ExtendedQuickPickItem | vscode.QuickPickItem> {
		// 根据文本生成选项的逻辑
		return [
			{ label: text.toUpperCase(), description: '转换为大写', value: text.toUpperCase() },
			{ label: 'Group 1', kind: vscode.QuickPickItemKind.Separator },
			{ label: text.toLowerCase(), description: '转换为小写', value: text.toLowerCase() },
		];
	}

	let convertCaseDisposable = vscode.commands.registerCommand('extension.convertCase', () => {
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
		vscode.window.showQuickPick(options).then(selection => {
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
