// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as TextConversion from './text-conversion';

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

	const handleEditorReplace = (convertFunction: (selectionText: string) => string) => {
		// 获取当前编辑器
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// 获取选中的文本
			let text = document.getText(selection);
			// 转换文本
			let converted = convertFunction(text);

			// 当转换后文本与转换前相同时，跳过转换
			if (text === converted) {
				console.log('selection text is same to converted text, skip replace contents.');
				return;
			}

			// 替换文本
			console.log('replace selection text', text, 'to', converted);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, converted);
			});
		}
	};

	let disposableCamelCase = vscode.commands.registerCommand('extension.toCamelCase', () => {
		handleEditorReplace(TextConversion.toCamelCase);
	});
	context.subscriptions.push(disposableCamelCase);

	let disposablePascalCase = vscode.commands.registerCommand('extension.toPascalCase', () => {
		handleEditorReplace(TextConversion.toPascalCase);
	});
	context.subscriptions.push(disposablePascalCase);

	let disposableUpperCase = vscode.commands.registerCommand('extension.toUpperCase', () => {
		handleEditorReplace(TextConversion.toUpperCase);
	});
	context.subscriptions.push(disposableUpperCase);

	let disposableLowerCase = vscode.commands.registerCommand('extension.toLowerCase', () => {
		handleEditorReplace(TextConversion.toLowerCase);
	});
	context.subscriptions.push(disposableLowerCase);

}

// This method is called when your extension is deactivated
export function deactivate() { }
