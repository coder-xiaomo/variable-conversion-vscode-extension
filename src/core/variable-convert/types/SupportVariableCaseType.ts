/**
 * When support a new variable case, there's something we need to do.
 *
 * Code:
 * - Add type definition in below `SupportCase` enum and following array
 * - Add `commands`, `menus`, `configuration` parts in [package.json] and [package-comment.jsonc]
 * - Add main conversion logic in [src/core/variable-convert/conversion.ts]
 *
 * Test:
 * - Add test case type definition in [src/test/types/TestCaseType.ts]
 * - Add test case in [src/test/test-case.ts]
 * - Add test code in [src/test/extension.test.ts]
 *
 * Docs:
 * - Modify `description` in [package.json] and [package-comment.jsonc]
 * - Add changes in [CHANGELOG.md] and [README.md]
 */
export enum SupportVariableCase {

    /**
     * 小驼峰(驼峰)命名
     * Camel Case
     * e.g. fooBar
     *
     * @alias: camelCase / CamelCase / camel case / camel_case / CAMEL_CASE
     * @since 2024-04-02
     */
    CAMEL_CASE,

    /**
     * 大驼峰(帕斯卡)命名
     * Pascal Case
     * e.g. FooBar
     *
     * @alias: pascalCase / PascalCase / pascal case / pascal_case / PASCAL_CASE
     * @since 2024-04-02
     */
    PASCAL_CASE,

    /**
     * 下划线(蛇形)命名
     * Snake Case
     * e.g. foo_bar
     *
     * @alias: snakeCase / SnakeCase / snake case / snake_case / SNAKE_CASE
     * @since 2024-04-02
     */
    SNAKE_CASE,

    /**
     * 下划线(蛇形) + 小驼峰(驼峰)命名
     * Snake Camel Case
     * e.g. foo_Bar
     *
     * @alias: snakeCamelCase / SnakeCamelCase / snake camel case / snake_camel_case / SNAKE_CAMEL_CASE
     * @since 2024-04-02
     */
    SNAKE_CAMEL_CASE,

    /**
     * 下划线(蛇形) + 大驼峰(帕斯卡)命名
     * Snake Pascal Case
     * e.g. Foo_Bar
     *
     * @alias: snakePascalCase / SnakePascalCase / snake pascal case / snake_pascal_case / SNAKE_PASCAL_CASE
     * @since 2024-04-02
     */
    SNAKE_PASCAL_CASE,

    /**
     * 下划线(蛇形) + 全大写命名
     * Snake Upper Case
     * e.g. FOO_BAR
     *
     * @alias: snakeUpperCase / SnakeUpperCase / snake upper case / snake_upper_case / SNAKE_UPPER_CASE
     * @since 2024-04-02
     */
    SNAKE_UPPER_CASE,

    /**
     * 中划线(连字符/脊柱式)命名
     * Kebab Case / Spinal Case
     * e.g. foo-bar
     *
     * @alias: kebabCase / KebabCase / kebab case / kebab_case / KEBAB_CASE
     *         spinalCase / SpinalCase / spinal case / spinal_case / SPINAL_CASE
     * @since 2024-04-02
     */
    KEBAB_CASE,

    /**
     * 中划线(连字符/脊柱式) + 小驼峰(驼峰)命名
     * Kebab Camel Case
     * e.g. foo-Bar
     *
     * @alias: kebabCamelCase / KebabCamelCase / kebab camel case / kebab_camel_case / KEBAB_CAMEL_CASE
     * @since 2024-04-03
     */
    KEBAB_CAMEL_CASE,

    /**
     * 中划线(连字符/脊柱式) + 大驼峰(帕斯卡)命名
     * Kebab Pascal Case
     * e.g. Foo-Bar
     *
     * @alias: kebabPascalCase / KebabPascalCase / kebab pascal case / kebab_pascal_case / KEBAB_PASCAL_CASE
     * @since 2024-04-03
     */
    KEBAB_PASCAL_CASE,

    /**
     * 中划线(连字符/脊柱式) + 全大写命名
     * Kebab Upper Case
     * e.g. FOO-BAR
     *
     * @alias: kebabUpperCase / KebabUpperCase / kebab upper case / kebab_upper_case / KEBAB_UPPER_CASE
     * @since 2024-04-03
     */
    KEBAB_UPPER_CASE,

    /**
     * 空格分隔命名
     * Space Case / Spinal Case
     * e.g. foo bar
     *
     * @alias: spaceCase / SpaceCase / space case / space_case / SPACE_CASE
     * @since 2024-04-07
     */
    SPACE_CASE,

    /**
     * 空格分隔 + 小驼峰(驼峰)命名
     * Space Camel Case
     * e.g. foo Bar
     *
     * @alias: spaceCamelCase / SpaceCamelCase / space camel case / space_camel_case / SPACE_CAMEL_CASE
     * @since 2024-04-07
     */
    SPACE_CAMEL_CASE,

    /**
     * 空格分隔 + 大驼峰(帕斯卡)命名
     * Space Pascal Case
     * e.g. Foo Bar
     *
     * @alias: spacePascalCase / SpacePascalCase / space pascal case / space_pascal_case / SPACE_PASCAL_CASE
     * @since 2024-04-07
     */
    SPACE_PASCAL_CASE,

    /**
     * 空格分隔 + 全大写命名
     * Space Upper Case
     * e.g. FOO BAR
     *
     * @alias: spaceUpperCase / SpaceUpperCase / space upper case / space_upper_case / SPACE_UPPER_CASE
     * @since 2024-04-07
     */
    SPACE_UPPER_CASE,

    /**
     * 点分隔命名
     * Dot Case / Spinal Case
     * e.g. foo bar
     *
     * @alias: dotCase / DotCase / dot case / dot_case / DOT_CASE
     * @since 2024-06-13
     */
    DOT_CASE,

    /**
     * 点分隔 + 小驼峰(驼峰)命名
     * Dot Camel Case
     * e.g. foo Bar
     *
     * @alias: dotCamelCase / DotCamelCase / dot camel case / dot_camel_case / DOT_CAMEL_CASE
     * @since 2024-06-13
     */
    DOT_CAMEL_CASE,

    /**
     * 点分隔 + 大驼峰(帕斯卡)命名
     * Dot Pascal Case
     * e.g. Foo Bar
     *
     * @alias: dotPascalCase / DotPascalCase / dot pascal case / dot_pascal_case / DOT_PASCAL_CASE
     * @since 2024-06-13
     */
    DOT_PASCAL_CASE,

    /**
     * 点分隔 + 全大写命名
     * Dot Upper Case
     * e.g. FOO BAR
     *
     * @alias: dotUpperCase / DotUpperCase / dot upper case / dot_upper_case / DOT_UPPER_CASE
     * @since 2024-06-13
     */
    DOT_UPPER_CASE,

    /**
     * 全小写
     * Lower Case
     * e.g. foo_bar / foobar
     *
     * @alias: lowerCase / LowerCase / lower case / lower_case / LOWER_CASE
     * @since 2024-04-02
     */
    LOWER_CASE,

    /**
     * 全大写
     * Upper Case
     * e.g. FOO_BAR / FOOBAR
     *
     * @alias: upperCase / UpperCase / upper case / upper_case / UPPER_CASE
     * @since 2024-04-02
     */
    UPPER_CASE,
}

const keyword = {
    camel: [
        '小驼峰', '驼峰',
        'Camel Case',
        'cc',
        'XiaoTuoFeng', 'TuoFeng',
        'xtf', 'tf',
    ],
    pascal: [
        '大驼峰', '帕斯卡',
        'Pascal Case',
        'pc',
        'DaTuoFeng', 'PaSiKa',
        'dtf', 'psk',
    ],
    snake: [
        '下划线', '蛇形', '_',
        'Snake Case', 'Underline Case',
        'sc', 'uc',
        'XiaHuaXian', 'SheXing',
        'xhx', 'sx',
    ],
    kebab: [
        '连字符', '脊柱式', '-',
        'Kebab Case', 'Spinal Case',
        'kc', 'sc',
        'LianZiFu', 'JiZhuShi',
        'lzf', 'jzs',
    ],
    space: [
        '空格', // ' ',
        'Space Case',
        'sc',
        'KongGe',
        'kg',
    ],
    dot: [
        '点', '.',
        'Dot Case',
        'dc',
        'Dian',
        'd',
    ],
    upper: [
        '全大写', '大写',
        'Upper Case',
        'uc',
        'QuanDaXie',
        'qdx',
    ],
    lower: [
        '全小写', '小写',
        'Lower Case',
        'lc',
        'QuanXiaoXie',
        'qxx',
    ],
};

interface Command {
    command: string;
    targetCase: SupportVariableCase;
    settingsKey: string;
    // variable-conversion.enabledFormats 中的配置项
    enableSettingsKey: string;
}

/**
 * 接管的变量转换命令
 */
export const commands: Array<Command> = [
    {
        command: 'variable-conversion.toCamelCase',
        targetCase: SupportVariableCase.CAMEL_CASE,
        settingsKey: 'camel_case',
        enableSettingsKey: 'camelCase.enabled',
    },
    {
        command: 'variable-conversion.toPascalCase',
        targetCase: SupportVariableCase.PASCAL_CASE,
        settingsKey: 'pascal_case',
        enableSettingsKey: 'pascalCase.enabled',
    },
    // +++++++++++++++++++++++++++++++++++++++++++++++
    {
        command: 'variable-conversion.toSnakeCase',
        targetCase: SupportVariableCase.SNAKE_CASE,
        settingsKey: 'snake_case',
        enableSettingsKey: 'snakeCase.enabled',
    },
    {
        command: 'variable-conversion.toSnakeUpperCase',
        targetCase: SupportVariableCase.SNAKE_UPPER_CASE,
        settingsKey: 'snake_upper_case',
        enableSettingsKey: 'snakeUpperCase.enabled',
    },
    {
        command: 'variable-conversion.toSnakePascalCase',
        targetCase: SupportVariableCase.SNAKE_PASCAL_CASE,
        settingsKey: 'snake_pascal_case',
        enableSettingsKey: 'snakePascalCase.enabled',
    },
    {
        command: 'variable-conversion.toSnakeCamelCase',
        targetCase: SupportVariableCase.SNAKE_CAMEL_CASE,
        settingsKey: 'snake_camel_case',
        enableSettingsKey: 'snakeCamelCase.enabled',
    },
    // +++++++++++++++++++++++++++++++++++++++++++++++
    {
        command: 'variable-conversion.toKebabCase',
        targetCase: SupportVariableCase.KEBAB_CASE,
        settingsKey: 'kebab_case',
        enableSettingsKey: 'kebabCase.enabled',
    },
    {
        command: 'variable-conversion.toKebabUpperCase',
        targetCase: SupportVariableCase.KEBAB_UPPER_CASE,
        settingsKey: 'kebab_upper_case',
        enableSettingsKey: 'kebabUpperCase.enabled',
    },
    {
        command: 'variable-conversion.toKebabPascalCase',
        targetCase: SupportVariableCase.KEBAB_PASCAL_CASE,
        settingsKey: 'kebab_pascal_case',
        enableSettingsKey: 'kebabPascalCase.enabled',
    },
    {
        command: 'variable-conversion.toKebabCamelCase',
        targetCase: SupportVariableCase.KEBAB_CAMEL_CASE,
        settingsKey: 'kebab_camel_case',
        enableSettingsKey: 'kebabCamelCase.enabled',
    },
    // +++++++++++++++++++++++++++++++++++++++++++++++
    {
        command: 'variable-conversion.toSpaceCase',
        targetCase: SupportVariableCase.SPACE_CASE,
        settingsKey: 'space_case',
        enableSettingsKey: 'spaceCase.enabled',
    },
    {
        command: 'variable-conversion.toSpaceUpperCase',
        targetCase: SupportVariableCase.SPACE_UPPER_CASE,
        settingsKey: 'space_upper_case',
        enableSettingsKey: 'spaceUpperCase.enabled',
    },
    {
        command: 'variable-conversion.toSpacePascalCase',
        targetCase: SupportVariableCase.SPACE_PASCAL_CASE,
        settingsKey: 'space_pascal_case',
        enableSettingsKey: 'spacePascalCase.enabled',
    },
    {
        command: 'variable-conversion.toSpaceCamelCase',
        targetCase: SupportVariableCase.SPACE_CAMEL_CASE,
        settingsKey: 'space_camel_case',
        enableSettingsKey: 'spaceCamelCase.enabled',
    },
    // +++++++++++++++++++++++++++++++++++++++++++++++
    {
        command: 'variable-conversion.toDotCase',
        targetCase: SupportVariableCase.DOT_CASE,
        settingsKey: 'dot_case',
        enableSettingsKey: 'dotCase.enabled',
    },
    {
        command: 'variable-conversion.toDotUpperCase',
        targetCase: SupportVariableCase.DOT_UPPER_CASE,
        settingsKey: 'dot_upper_case',
        enableSettingsKey: 'dotUpperCase.enabled',
    },
    {
        command: 'variable-conversion.toDotPascalCase',
        targetCase: SupportVariableCase.DOT_PASCAL_CASE,
        settingsKey: 'dot_pascal_case',
        enableSettingsKey: 'dotPascalCase.enabled',
    },
    {
        command: 'variable-conversion.toDotCamelCase',
        targetCase: SupportVariableCase.DOT_CAMEL_CASE,
        settingsKey: 'dot_camel_case',
        enableSettingsKey: 'dotCamelCase.enabled',
    },
    // +++++++++++++++++++++++++++++++++++++++++++++++
    {
        command: 'variable-conversion.toLowerCase',
        targetCase: SupportVariableCase.LOWER_CASE,
        settingsKey: 'lower_case',
        enableSettingsKey: 'lowerCase.enabled',
    },
    {
        command: 'variable-conversion.toUpperCase',
        targetCase: SupportVariableCase.UPPER_CASE,
        settingsKey: 'upper_case',
        enableSettingsKey: 'upperCase.enabled',
    },
];

export interface QuickPickSupportCaseItem {
    type: SupportVariableCase,
    name: string,
    shortName: string,
    keyword: string[],
    settingsKey: string,
}

/**
 * 所有支持的命名方式
 * @since 2024-04-06
 */
export const quickPickSupportCases: Array<QuickPickSupportCaseItem> = [
    {
        type: SupportVariableCase.CAMEL_CASE,
        name: '小驼峰(驼峰)命名',
        shortName: '小驼峰',
        keyword: keyword.camel,
        settingsKey: 'camel_case',
    },
    {
        type: SupportVariableCase.PASCAL_CASE,
        name: '大驼峰(帕斯卡)命名',
        shortName: '帕斯卡',
        keyword: keyword.pascal,
        settingsKey: 'pascal_case',
    },
    {
        type: SupportVariableCase.SNAKE_CASE,
        name: '下划线(蛇形)命名',
        shortName: '蛇形',
        keyword: [...keyword.snake, ...keyword.lower],
        settingsKey: 'snake_case',
    },
    {
        type: SupportVariableCase.SNAKE_CAMEL_CASE,
        name: '下划线(蛇形) + 小驼峰(驼峰)命名',
        shortName: '蛇形驼峰',
        keyword: [...keyword.snake, ...keyword.camel],
        settingsKey: 'snake_camel_case',
    },
    {
        type: SupportVariableCase.SNAKE_PASCAL_CASE,
        name: '下划线(蛇形) + 大驼峰(帕斯卡)命名',
        shortName: '蛇形帕斯卡',
        keyword: [...keyword.snake, ...keyword.pascal],
        settingsKey: 'snake_pascal_case',
    },
    {
        type: SupportVariableCase.SNAKE_UPPER_CASE,
        name: '下划线(蛇形) + 全大写命名',
        shortName: '蛇形大写',
        keyword: [...keyword.snake, ...keyword.upper],
        settingsKey: 'snake_upper_case',
    },
    {
        type: SupportVariableCase.KEBAB_CASE,
        name: '中划线(连字符/脊柱式)命名',
        shortName: '脊柱',
        keyword: [...keyword.kebab, ...keyword.lower],
        settingsKey: 'kebab_case',
    },
    {
        type: SupportVariableCase.KEBAB_CAMEL_CASE,
        name: '中划线(连字符/脊柱式) + 小驼峰(驼峰)命名',
        shortName: '脊柱驼峰',
        keyword: [...keyword.kebab, ...keyword.camel],
        settingsKey: 'kebab_camel_case',
    },
    {
        type: SupportVariableCase.KEBAB_PASCAL_CASE,
        name: '中划线(连字符/脊柱式) + 大驼峰(帕斯卡)命名',
        shortName: '脊柱帕斯卡',
        keyword: [...keyword.kebab, ...keyword.pascal],
        settingsKey: 'kebab_pascal_case',
    },
    {
        type: SupportVariableCase.KEBAB_UPPER_CASE,
        name: '中划线(连字符/脊柱式) + 全大写命名',
        shortName: '脊柱大写',
        keyword: [...keyword.kebab, ...keyword.upper],
        settingsKey: 'kebab_upper_case',
    },
    {
        type: SupportVariableCase.SPACE_CASE,
        name: '空格分隔命名',
        shortName: '脊柱',
        keyword: [...keyword.space, ...keyword.lower],
        settingsKey: 'space_case',
    },
    {
        type: SupportVariableCase.SPACE_CAMEL_CASE,
        name: '空格分隔 + 小驼峰(驼峰)命名',
        shortName: '脊柱驼峰',
        keyword: [...keyword.space, ...keyword.camel],
        settingsKey: 'space_camel_case',
    },
    {
        type: SupportVariableCase.SPACE_PASCAL_CASE,
        name: '空格分隔 + 大驼峰(帕斯卡)命名',
        shortName: '脊柱帕斯卡',
        keyword: [...keyword.space, ...keyword.pascal],
        settingsKey: 'space_pascal_case',
    },
    {
        type: SupportVariableCase.SPACE_UPPER_CASE,
        name: '空格分隔 + 全大写命名',
        shortName: '脊柱大写',
        keyword: [...keyword.space, ...keyword.upper],
        settingsKey: 'space_upper_case',
    },
    {
        type: SupportVariableCase.DOT_CASE,
        name: '点分隔命名',
        shortName: '脊柱',
        keyword: [...keyword.dot, ...keyword.lower],
        settingsKey: 'dot_case',
    },
    {
        type: SupportVariableCase.DOT_CAMEL_CASE,
        name: '点分隔 + 小驼峰(驼峰)命名',
        shortName: '脊柱驼峰',
        keyword: [...keyword.dot, ...keyword.camel],
        settingsKey: 'dot_camel_case',
    },
    {
        type: SupportVariableCase.DOT_PASCAL_CASE,
        name: '点分隔 + 大驼峰(帕斯卡)命名',
        shortName: '脊柱帕斯卡',
        keyword: [...keyword.dot, ...keyword.pascal],
        settingsKey: 'dot_pascal_case',
    },
    {
        type: SupportVariableCase.DOT_UPPER_CASE,
        name: '点分隔 + 全大写命名',
        shortName: '脊柱大写',
        keyword: [...keyword.dot, ...keyword.upper],
        settingsKey: 'dot_upper_case',
    },
    {
        type: SupportVariableCase.LOWER_CASE,
        name: '全小写',
        shortName: '小写',
        keyword: keyword.lower,
        settingsKey: 'lower_case',
    },
    {
        type: SupportVariableCase.UPPER_CASE,
        name: '全大写',
        shortName: '大写',
        keyword: keyword.upper,
        settingsKey: 'upper_case',
    },
];

export interface CyclicConvertCaseOrderItem {
    type: SupportVariableCase,
    settingsKey: string,
}

/**
 * 通过快捷键循环转换的顺序
 * @since 2024-04-08
 */
export const cyclicConvertCaseOrder: Array<CyclicConvertCaseOrderItem> = [
    { type: SupportVariableCase.CAMEL_CASE, settingsKey: 'camel_case' },
    { type: SupportVariableCase.SNAKE_CASE, settingsKey: 'snake_case' },
    { type: SupportVariableCase.PASCAL_CASE, settingsKey: 'pascal_case' },
    { type: SupportVariableCase.KEBAB_CASE, settingsKey: 'kebab_case' },
    { type: SupportVariableCase.SPACE_CASE, settingsKey: 'space_case' },
    { type: SupportVariableCase.DOT_CASE, settingsKey: 'dot_case' },

    { type: SupportVariableCase.SNAKE_UPPER_CASE, settingsKey: 'snake_upper_case' },
    { type: SupportVariableCase.KEBAB_UPPER_CASE, settingsKey: 'kebab_upper_case' },
    { type: SupportVariableCase.SPACE_UPPER_CASE, settingsKey: 'space_upper_case' },
    { type: SupportVariableCase.DOT_UPPER_CASE, settingsKey: 'dot_upper_case' },

    { type: SupportVariableCase.SNAKE_PASCAL_CASE, settingsKey: 'snake_pascal_case' },
    { type: SupportVariableCase.KEBAB_PASCAL_CASE, settingsKey: 'kebab_pascal_case' },
    { type: SupportVariableCase.SPACE_PASCAL_CASE, settingsKey: 'space_pascal_case' },
    { type: SupportVariableCase.DOT_PASCAL_CASE, settingsKey: 'dot_pascal_case' },

    { type: SupportVariableCase.SNAKE_CAMEL_CASE, settingsKey: 'snake_camel_case' },
    { type: SupportVariableCase.KEBAB_CAMEL_CASE, settingsKey: 'kebab_camel_case' },
    { type: SupportVariableCase.SPACE_CAMEL_CASE, settingsKey: 'space_camel_case' },
    { type: SupportVariableCase.DOT_CAMEL_CASE, settingsKey: 'dot_camel_case' },

    { type: SupportVariableCase.LOWER_CASE, settingsKey: 'lower_case' },
    { type: SupportVariableCase.UPPER_CASE, settingsKey: 'upper_case' },
];
