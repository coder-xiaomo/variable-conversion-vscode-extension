const vscode = require('vscode');

function getUserConfigurations(configKey: string) {
    const config = vscode.workspace.getConfiguration('variable-conversion');

    // 获取 disableFormat 配置项
    const configValue = config.get(configKey);
    console.log('configValue:', configValue);
    return configValue;
}

export {
    getUserConfigurations
};
