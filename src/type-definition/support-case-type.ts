/**
 * When support a new case, there's something we need to do.
 *
 * Code:
 * - Add `commands`, `menus` parts in package.json (and package-comment.jsonc)
 * - Add main conversion logic in src/main-code/variable-conversion.ts
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
 */
export enum SupportCase {
    /**
     * 小驼峰 / 驼峰命名
     * Camel Case
     * e.g. fooBar
     *
     * @alias: camelCase / CamelCase / camel case / camel_case / CAMEL_CASE
     * @since 2024-04-02
     */
    CAMEL_CASE,

    /**
     * 大驼峰 / 帕斯卡命名
     * Pascal Case
     * e.g. FooBar
     *
     * @alias: pascalCase / PascalCase / pascal case / pascal_case / PASCAL_CASE
     * @since 2024-04-02
     */
    PASCAL_CASE,

    /**
     * 连字符 / 脊柱式命名
     * Kebab Case / Spinal Case
     * e.g. foo-bar
     *
     * @alias: kebabCase / KebabCase / kebab case / kebab_case / KEBAB_CASE
     *         spinalCase / SpinalCase / spinal case / spinal_case / SPINAL_CASE
     * @since 2024-04-02
     */
    KEBAB_CASE,

    /**
     * 驼峰脊柱式命名
     * Camel Kebab Case
     * e.g. Foo-Bar
     *
     * @alias: camelkebabCase / CamelKebabCase / camel kebab case / camel_kebab_case / CAMEL_UPPER_CASE
     * @since 2024-04-03
     */
    CAMEL_UPPER_CASE,

    /**
     * 连字符命名大写
     * Kebab Upper Case
     * e.g. FOO-BAR
     *
     * @alias: kebabUpperCase / KebabUpperCase / kebab upper case / kebab_upper_case / KEBAB_UPPER_CASE
     * @since 2024-04-03
     */
    KEBAB_UPPER_CASE,

    /**
     * 下划线 / 蛇形命名
     * Snake Case
     * e.g. foo_bar
     *
     * @alias: snakeCase / SnakeCase / snake case / snake_case / SNAKE_CASE
     * @since 2024-04-02
     */
    SNAKE_CASE,

    /**
     * 驼峰蛇形命名
     * Camel Snake Case
     * e.g. Foo_Bar
     *
     * @alias: camelSnakeCase / CamelSnakeCase / camel snake case / camel_snake_case / CAMEL_SNAKE_CASE
     * @since 2024-04-02
     */
    CAMEL_SNAKE_CASE,

    /**
     * 下划线大写
     * Snake Upper Case
     * e.g. FOO_BAR
     *
     * @alias: snakeUpperCase / SnakeUpperCase / snake upper case / snake_upper_case / SNAKE_UPPER_CASE
     * @since 2024-04-02
     */
    SNAKE_UPPER_CASE,

    /**
     * 全大写
     * Upper Case
     * e.g. FOO_BAR / FOOBAR
     *
     * @alias: upperCase / UpperCase / upper case / upper_case / UPPER_CASE
     * @since 2024-04-02
     */
    UPPER_CASE,

    /**
     * 全小写
     * Lower Case
     * e.g. foo_bar / foobar
     *
     * @alias: lowerCase / LowerCase / lower case / lower_case / LOWER_CASE
     * @since 2024-04-02
     */
    LOWER_CASE,
}
