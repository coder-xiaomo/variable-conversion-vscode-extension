import * as vscode from 'vscode';

interface ExtendedQuickPickItem extends vscode.QuickPickItem {
    value: string[];
}

// type QuickPickItemEx = ExtendedQuickPickItem | vscode.QuickPickItem;
type QuickPickItemEx = ExtendedQuickPickItem;

export default QuickPickItemEx;
