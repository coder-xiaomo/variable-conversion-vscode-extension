/**
 * 路径转换类型
 *
 * @since 2024-12-14
 */
export enum SupportPathFormat {

    /**
     * Windows 风格
     *
     * @alias: windows / Windows
     * @since 2024-12-07
     */
    Windows,

    /**
     * Unix 风格
     *
     * @alias: unix / Unix
     * @since 2024-12-07
     */
    Unix,
};

const keyword = {
    windows: [
        'Windows', 'win',
    ],
    unix: [
        'Unix',
        'Linux',
        'macOS',
    ],
};

/**
 * 接管的变量转换命令
 *
 * @since 2024-12-14
 */
export const commands: Array<{ command: string; targetCase: SupportPathFormat; settingsKey: string }> = [
    {
        command: 'variable-conversion.pathFormat.toWindowsStyle',
        targetCase: SupportPathFormat.Windows,
        settingsKey: 'windows_style'
    },
    {
        command: 'variable-conversion.pathFormat.toUnixStyle',
        targetCase: SupportPathFormat.Unix,
        settingsKey: 'unix_style'
    },
];

/**
 * @since 2024-12-14
 */
export interface QuickPickSupportCaseItem {
    type: SupportPathFormat,
    name: string,
    shortName: string,
    keyword: string[],
    settingsKey: string,
}

/**
 * 所有支持的路径风格
 * @since 2024-12-14
 */
export const quickPickSupportCases: Array<QuickPickSupportCaseItem> = [
    {
        type: SupportPathFormat.Windows,
        name: 'Microsoft Windows 风格',
        shortName: 'Windows 风格',
        keyword: keyword.windows,
        settingsKey: 'windows_style',
    },
    {
        type: SupportPathFormat.Unix,
        name: 'Unix / 类 Unix 风格 (Linux, macOS, ...)',
        shortName: 'Unix 风格',
        keyword: keyword.unix,
        settingsKey: 'unix_style',
    },
];

/**
 * @since 2024-12-14
 */
export interface CyclicConvertPathOrderItem {
    type: SupportPathFormat,
    settingsKey: string,
}

/**
 * 通过快捷键循环转换的顺序
 * @since 2024-12-14
 */
export const cyclicConvertPathOrder: Array<CyclicConvertPathOrderItem> = [
    { type: SupportPathFormat.Windows, settingsKey: 'windows' },
    { type: SupportPathFormat.Unix, settingsKey: 'unix' },
];
