const vscode = require('vscode');

/**
 * 获取用户配置项
 *
 * @param configKey 配置项的键
 * @returns 配置项的值
 * @since 2024-07-29
 */
function getUserConfigurations(configKey: string) {
    const config = vscode.workspace.getConfiguration('variable-conversion');

    const configValue = config.get(configKey);
    console.log('configValue:', configValue);
    return configValue;
}

export {
    getUserConfigurations
};
