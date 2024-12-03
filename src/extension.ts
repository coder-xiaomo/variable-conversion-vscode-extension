// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import handleEditorReplace from './extension-handler/editor-submenu-handler';
import { handleQuickPick } from './extension-handler/quick-pick-handler';
import { commands } from './type-definition/SupportCaseType';
import { createStatusBarItem, updateStatusBarItemVisable } from './extension-handler/status-bar-handler';
import * as CyclicConversion from './main-code/variable-convert/cyclic-conversion';
import { EOL } from './type-definition/EOLType';
import { getUserConfigurations } from './main-code/user-configuration';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	try {
		// 获取当前插件的扩展对象
		const currentExtension = vscode.extensions.getExtension('coder-xiaomo.variable-conversion');
		if (currentExtension) {
			// 获取版本号
			const version = currentExtension.packageJSON.version;
			console.log('[Variable Conversion] current version:', version);
		}
	} catch (err) {
		console.log('get current extension failed', err);
	}

	// 用于记录当前选中的文本的长度
	let selectTextLength = 0;

	// 选中文本改变时触发
	const onTextEditorSelectionChangeCallback = (textEditor: vscode.TextEditor, selections: readonly vscode.Selection[]) => {
		// 获取选中的文本块
		const textList: string[] = [];
		let tmp_selectTextLength = 0;
		for (const selection of selections) {
			const text = textEditor.document.getText(selection);
			textList.push(text);
			tmp_selectTextLength += text.length;
		}
		selectTextLength = tmp_selectTextLength;

		// 更新 _textSelectionLength (用于判断是否展示右键菜单)
		vscode.commands.executeCommand('setContext', '_textSelectionLength', selectTextLength);

		// issue: #1 https://github.com/coder-xiaomo/variable-conversion-vscode-extension/issues/1
		// 获取用户配置
		const disableFormatList = getUserConfigurations('disableFormat');
		// 更新右键菜单每一项是否展示
		for (const { settingsKey } of commands) {
			vscode.commands.executeCommand('setContext', '_isHideSubMenuItem_' + settingsKey, disableFormatList.includes(settingsKey));
		}

		// 判断是否展示状态栏按钮
		updateStatusBarItemVisable(selectTextLength);

		// 循环转换：记录当前选中内容，并且进行转换
		let eol: EOL = textEditor.document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';
		CyclicConversion.onUserSelectionUpdated(selections, textList, eol);
	};

	// 创建状态栏按钮
	createStatusBarItem();

	/**
	 * 切换编辑器 Tab 时触发
	 */
	vscode.window.onDidChangeActiveTextEditor(event => {
		console.log('onDidChangeActiveTextEditor', event);

		// 小窗中编辑器选中后，不做其他点击鼠标点击操作，直接点击主窗口任务栏[变量转换]按钮
		// 能够在主窗口 QuickPick 中对小窗中所选文字进行转换操作 (不太完美的兼容)
		let textEditor = vscode.window.activeTextEditor;
		if (textEditor) {
			const selections = textEditor.selections;
			onTextEditorSelectionChangeCallback(textEditor, selections);
		} else { // 进入 else 的场景举例: 从[代码编辑器]切换到[设置页]
			// 判断是否展示状态栏按钮
			updateStatusBarItemVisable(selectTextLength);
		}
	});

	/**
	 * 编辑器中光标选中位置改变触发
	 */
	vscode.window.onDidChangeTextEditorSelection(event => {
		// console.log('光标选中位置改变 onDidChangeTextEditorSelection', event);
		// 执行 Callback
		onTextEditorSelectionChangeCallback(event.textEditor, event.selections);
	});

	// 初始(VSCode 插件初始化)时也判断一次 (考虑上次关闭 VSCode 有选区，重新打开后 VSCode 回复选区但用户未重新切换选区的场景)
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		// VSCode 启动时打开的 Tab 不是编辑器 Tab, 执行 Callback (如果不是则跳过)
		onTextEditorSelectionChangeCallback(editor, editor.selections);
	}

	// 逐一注册右键菜单-子菜单项 command
	for (const { command, targetCase } of commands) {
		let disposable = vscode.commands.registerCommand(command, () => {
			handleEditorReplace(targetCase);
		});
		context.subscriptions.push(disposable);
	}

	// 注册变量转换 command 状态栏/快捷键/右键[变量转换]菜单均有用到
	let convertCaseDisposable = vscode.commands.registerCommand('variable-conversion.convertCase', handleQuickPick);
	context.subscriptions.push(convertCaseDisposable);

	// 注册循环转换 command
	let disposableLoopConversionPrev = vscode.commands.registerCommand('variable-conversion.cyclicConvertCase.previous', ({ arrowKey }) => {
		console.log('variable-conversion.convertCase', arrowKey);
		CyclicConversion.previousOne();
	});
	context.subscriptions.push(disposableLoopConversionPrev);
	let disposableLoopConversionNext = vscode.commands.registerCommand('variable-conversion.cyclicConvertCase.next', ({ arrowKey }) => {
		console.log('variable-conversion.convertCase', arrowKey);
		CyclicConversion.nextOne();
	});
	context.subscriptions.push(disposableLoopConversionNext);
}

// This method is called when your extension is deactivated
export function deactivate() { }
