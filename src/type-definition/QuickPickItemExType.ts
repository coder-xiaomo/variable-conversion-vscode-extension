import * as vscode from 'vscode';

interface ExtendedQuickPickItem extends vscode.QuickPickItem {
    value: string;
}

type QuickPickItemEx = ExtendedQuickPickItem | vscode.QuickPickItem;

export default QuickPickItemEx;
