// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as TextConversion from './main-code/text-conversion';
import { ConvertFunction, EOL } from './type-definition/convert-function-type';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "text-conversion" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('text-conversion.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from text-conversion!');
	// });

	// 用于判断是否展示右键菜单
	vscode.window.onDidChangeTextEditorSelection(event => {
		const text = event.textEditor.document.getText(event.selections[0]);
		vscode.commands.executeCommand('setContext', '_textSelectionLength', text.length);
	});

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

}

// This method is called when your extension is deactivated
export function deactivate() { }
