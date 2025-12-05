import * as vscode from 'vscode';
import { cyclicConvertCaseOrder, quickPickSupportCases, commands } from './types/SupportVariableCaseType';
import { getUserConfigurations } from '../../utils/user-configuration';

/**
 * 显示当前配置的格式顺序信息
 */
export function showConvertCaseOrderDialog() {
    // 获取用户配置的格式顺序
    const formatOrder = getUserConfigurations<string[]>('formatOrder') || [];
    // 获取启用的格式
    const enabledFormats = getUserConfigurations<Record<string, boolean>>('enabledFormats') || {};

    // 创建格式名称映射
    const formatNameMap: Record<string, string> = {};
    quickPickSupportCases.forEach(item => {
        formatNameMap[item.settingsKey] = item.name;
    });

    // 创建settingsKey到enableSettingsKey的映射
    const settingsKeyToEnableKeyMap: Record<string, string> = {};
    commands.forEach(item => {
        settingsKeyToEnableKeyMap[item.settingsKey] = item.enableSettingsKey;
    });

    // 构建显示内容
    let message = '当前配置的变量命名格式顺序：\n\n';

    // 先显示用户配置的顺序
    if (formatOrder.length > 0) {
        message += '用户自定义顺序：\n';
        formatOrder.forEach((format, index) => {
            const isEnabled = enabledFormats[format] !== false;
            const status = isEnabled ? '✅' : '❌';
            message += `${index + 1}. ${formatNameMap[format] || format} (${format}) ${status}\n`;
        });
    } else {
        message += '未设置自定义顺序，使用默认顺序\n\n';
    }

    // 显示未配置但已启用的格式
    const unconfiguredEnabledFormats = cyclicConvertCaseOrder
        .filter(item => {
            const enableKey = settingsKeyToEnableKeyMap[item.settingsKey];
            const isEnabled = enableKey ? enabledFormats[enableKey] !== false : true;
            return isEnabled && !formatOrder.includes(item.settingsKey);
        })
        .map(item => item.settingsKey);

    if (unconfiguredEnabledFormats.length > 0) {
        message += '\n未配置但已启用的格式（默认顺序）：\n';
        unconfiguredEnabledFormats.forEach((format, index) => {
            message += `${formatOrder.length + index + 1}. ${formatNameMap[format] || format} (${format}) ✅\n`;
        });
    }

    // 显示未启用的格式
    const disabledFormats = cyclicConvertCaseOrder
        .filter(item => {
            const enableKey = settingsKeyToEnableKeyMap[item.settingsKey];
            return enableKey ? enabledFormats[enableKey] === false : false;
        })
        .map(item => item.settingsKey);

    if (disabledFormats.length > 0) {
        message += '\n未启用的格式：\n';
        disabledFormats.forEach(format => {
            message += `- ${formatNameMap[format] || format} (${format}) ❌\n`;
        });
    }

    message += '\n提示：未启用的格式即使在顺序中配置也不会显示在转换选项中';

    // 显示信息弹窗
    vscode.window.showInformationMessage<vscode.MessageItem>('格式顺序配置信息', { modal: true, detail: message });
}
