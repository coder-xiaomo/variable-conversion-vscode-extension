/**
 * @file extension.ts
 * @description 该文件包含了 VS Code 插件的主要扩展逻辑，包括命令注册、菜单配置和编辑器事件监听等。
 * @author coder-xiaomo
 * @version 1.0.0
 * @license MIT
 *
 * 本文件是插件的核心文件，负责扩展命令的注册以及编辑器中各种事件的处理。通过监听编辑器的选择状态，
 * 动态更新命令行为。插件在启动时会初始化必要的命令，并根据编辑器状态决定是否启用相关功能。
 *
 * @see https://code.visualstudio.com/api
 */
import * as vscode from 'vscode';
import handleEditorReplace from './handler/editor-submenu-handler';
import { handleQuickPick } from './handler/quick-pick-handler';
import { commands } from './core/variable-convert/types/SupportVariableCaseType';
import { createStatusBarItem, updateStatusBarItemVisable } from './handler/status-bar-handler';
import * as CyclicConversion from './core/variable-convert/cyclic-conversion';
import { EOL } from './types/EOLType';
import { getUserConfigurations } from './utils/user-configuration';

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
		const disableFormatList = getUserConfigurations<Array<string>>('disableFormat') || [];
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
	let loopConvertCasePrevDisposable = vscode.commands.registerCommand('variable-conversion.cyclicConvertCase.previous', ({ arrowKey }) => {
		console.log('variable-conversion.cyclicConvertCase.previous', arrowKey);
		CyclicConversion.previousOne();
	});
	context.subscriptions.push(loopConvertCasePrevDisposable);
	let loopConvertCaseNextDisposable = vscode.commands.registerCommand('variable-conversion.cyclicConvertCase.next', ({ arrowKey }) => {
		console.log('variable-conversion.cyclicConvertCase.next', arrowKey);
		CyclicConversion.nextOne();
	});
	context.subscriptions.push(loopConvertCaseNextDisposable);


	/**
	 * 路径转换
	 * issue: #3 https://github.com/coder-xiaomo/variable-conversion-vscode-extension/issues/3
	 */

	// 注册路径转换 command 状态栏/快捷键/右键[路径转换]菜单均有用到
	let convertPathDisposable = vscode.commands.registerCommand('variable-conversion.convertPath', handleQuickPick);
	context.subscriptions.push(convertPathDisposable);

	// 注册循环转换 command
	let loopConvertPathPrevDisposable = vscode.commands.registerCommand('variable-conversion.cyclicConvertPath.previous', ({ direction }) => {
		console.log('variable-conversion.cyclicConvertPath.previous', direction);
		// TODO
	});
	context.subscriptions.push(loopConvertPathPrevDisposable);
	let loopConvertPathNextDisposable = vscode.commands.registerCommand('variable-conversion.cyclicConvertPath.next', ({ direction }) => {
		console.log('variable-conversion.cyclicConvertPath.next', direction);
		// TODO
	});
	context.subscriptions.push(loopConvertPathNextDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
