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

    // 获取所有有效的settingsKey
    const validSettingsKeys = new Set(quickPickSupportCases.map(item => item.settingsKey));

    // 检测重复项和无效项
    const seenSettingsKeys = new Set<string>();
    const duplicateSettingsKeys = new Set<string>();
    const invalidSettingsKeys = new Set<string>();

    formatOrder.forEach(format => {
        if (!validSettingsKeys.has(format)) {
            invalidSettingsKeys.add(format);
        } else if (seenSettingsKeys.has(format)) {
            duplicateSettingsKeys.add(format);
        } else {
            seenSettingsKeys.add(format);
        }
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
            const enableKey = settingsKeyToEnableKeyMap[format];
            const isEnabled = enableKey ? enabledFormats[enableKey] !== false : true;
            const status = isEnabled ? '✔️' : '❌'; // ✅✔️☑️

            // 添加重复和无效标记
            let marker = '';
            if (!validSettingsKeys.has(format)) {
                marker = ' ❌ (无效格式)';
            } else if (duplicateSettingsKeys.has(format)) {
                marker = ' ⚠️ (重复配置)';
            }

            message += `${index + 1}. ${formatNameMap[format] || format} (${format}) ${marker || status}\n`;
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

    // 警告信息
    if (duplicateSettingsKeys.size > 0 || invalidSettingsKeys.size > 0) {
        message += '\n';
        if (duplicateSettingsKeys.size > 0) {
            message += `⚠️ 警告：发现重复配置的格式：${Array.from(duplicateSettingsKeys).join(', ')}\n`;
        }

        if (invalidSettingsKeys.size > 0) {
            message += `❌ 错误：发现无效格式：${Array.from(invalidSettingsKeys).join(', ')}\n`;
        }
    }

    message += '\n';
    message += '提示：\n';
    message += '- 未启用的格式即使在顺序中配置也不会显示在转换选项中\n';
    message += '- 重复和无效的格式配置可能会导致显示异常\n';

    // 显示信息弹窗
    vscode.window.showInformationMessage<vscode.MessageItem>('格式顺序配置信息', { modal: true, detail: message });
}
