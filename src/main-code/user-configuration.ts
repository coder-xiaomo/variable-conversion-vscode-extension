import vscode from 'vscode';

/**
 * 获取用户配置项
 *
 * @param configKey 配置项的键
 * @returns 配置项的值
 * @since 2024-07-29
 */
function getUserConfigurations<T>(configKey: string): T | undefined {
    const config = vscode.workspace.getConfiguration('variable-conversion');

    const configValue = config.get<T>(configKey);
    console.log('configValue:', configValue);
    return configValue;
}

export {
    getUserConfigurations
};
