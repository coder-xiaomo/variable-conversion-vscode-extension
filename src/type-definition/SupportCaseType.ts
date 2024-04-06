/**
 * When support a new case, there's something we need to do.
 *
 * Code:
 * - Add `commands`, `menus` parts in package.json (and package-comment.jsonc)
 * - Add main conversion logic in src/main-code/variable-conversion.ts
 * - Add disposable in src/extension.ts
 *
 * Test:
 * - Add test case type definition in src/type-definition/test-case-type.ts
 * - Add test case in src/test/test-case.ts
 * - Add test code in src/test/extension.test.ts
 *
 * Docs:
 * - Add type definition in below `SupportCase` enum
 * - Modify `description` in package.json
 * - Add changes in CHANGELOG.md
 * - Add changes in README.md
 */
export enum SupportCase {

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
     * 连字符(脊柱式)命名
     * Kebab Case / Spinal Case
     * e.g. foo-bar
     *
     * @alias: kebabCase / KebabCase / kebab case / kebab_case / KEBAB_CASE
     *         spinalCase / SpinalCase / spinal case / spinal_case / SPINAL_CASE
     * @since 2024-04-02
     */
    KEBAB_CASE,

    /**
     * 连字符(脊柱式) + 小驼峰(驼峰)命名
     * Kebab Camel Case
     * e.g. foo-Bar
     *
     * @alias: kebabCamelCase / KebabCamelCase / kebab camel case / kebab_camel_case / KEBAB_CAMEL_CASE
     * @since 2024-04-03
     */
    KEBAB_CAMEL_CASE,

    /**
     * 连字符(脊柱式) + 大驼峰(帕斯卡)命名
     * Kebab Pascal Case
     * e.g. Foo-Bar
     *
     * @alias: kebabPascalCase / KebabPascalCase / kebab pascal case / kebab_pascal_case / KEBAB_PASCAL_CASE
     * @since 2024-04-03
     */
    KEBAB_PASCAL_CASE,

    /**
     * 连字符(脊柱式) + 全大写命名
     * Kebab Upper Case
     * e.g. FOO-BAR
     *
     * @alias: kebabUpperCase / KebabUpperCase / kebab upper case / kebab_upper_case / KEBAB_UPPER_CASE
     * @since 2024-04-03
     */
    KEBAB_UPPER_CASE,

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

/**
 * 所有支持的命名方式
 * @since 2024-04-06
 */
export const qickPickSupportCases = [
    {
        type: SupportCase.CAMEL_CASE,
        name: '小驼峰(驼峰)命名',
        shortName: '小驼峰',
        keyword: keyword.camel,
    },
    {
        type: SupportCase.PASCAL_CASE,
        name: '大驼峰(帕斯卡)命名',
        shortName: '帕斯卡',
        keyword: keyword.pascal,
    },
    {
        type: SupportCase.SNAKE_CASE,
        name: '下划线(蛇形)命名',
        shortName: '蛇形',
        keyword: [...keyword.snake, ...keyword.lower],
    },
    {
        type: SupportCase.SNAKE_CAMEL_CASE,
        name: '下划线(蛇形) + 小驼峰(驼峰)命名',
        shortName: '蛇形驼峰',
        keyword: [...keyword.snake, ...keyword.camel],
    },
    {
        type: SupportCase.SNAKE_PASCAL_CASE,
        name: '下划线(蛇形) + 大驼峰(帕斯卡)命名',
        shortName: '蛇形帕斯卡',
        keyword: [...keyword.snake, ...keyword.pascal],
    },
    {
        type: SupportCase.SNAKE_UPPER_CASE,
        name: '下划线(蛇形) + 全大写命名',
        shortName: '蛇形大写',
        keyword: [...keyword.snake, ...keyword.upper],
    },
    {
        type: SupportCase.KEBAB_CASE,
        name: '连字符(脊柱式)命名',
        shortName: '脊柱',
        keyword: [...keyword.kebab, ...keyword.lower],
    },
    {
        type: SupportCase.KEBAB_CAMEL_CASE,
        name: '连字符(脊柱式) + 小驼峰(驼峰)命名',
        shortName: '脊柱驼峰',
        keyword: [...keyword.kebab, ...keyword.camel],
    },
    {
        type: SupportCase.KEBAB_PASCAL_CASE,
        name: '连字符(脊柱式) + 大驼峰(帕斯卡)命名',
        shortName: '脊柱帕斯卡',
        keyword: [...keyword.snake, ...keyword.pascal],
    },
    {
        type: SupportCase.KEBAB_UPPER_CASE,
        name: '连字符(脊柱式) + 全大写命名',
        shortName: '脊柱大写',
        keyword: [...keyword.snake, ...keyword.upper],
    },
    {
        type: SupportCase.LOWER_CASE,
        name: '全小写',
        shortName: '小写',
        keyword: keyword.lower,
    },
    {
        type: SupportCase.UPPER_CASE,
        name: '全大写',
        shortName: '大写',
        keyword: keyword.upper,
    },
];
