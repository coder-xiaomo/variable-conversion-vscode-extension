/**
 * 路径转换类型
 *
 * @since 2024-12-14
 */
export enum SupportPathFormat {

    /**
     * Windows 格式
     *
     * @alias: windows / Windows
     * @since 2024-12-07
     */
    Windows,

    /**
     * Unix 格式
     *
     * @alias: unix / Unix
     * @since 2024-12-07
     */
    Unix,
};

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
