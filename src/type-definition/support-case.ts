export enum SupportCase {
    /**
     * 小驼峰 / 驼峰命名
     * Camel Case
     * e.g. fooBar
     * 
     * @alias: camelCase / CamelCase / camel_case / CAMEL_CASE
     * @since 2024-04-02
     */
    CAMEL_CASE,

    /**
     * 大驼峰 / 帕斯卡命名
     * Pascal Case
     * e.g. FooBar
     * 
     * @alias: pascalCase / PascalCase / pascal_case / PASCAL_CASE
     * @since 2024-04-02
     */
    PASCAL_CASE,

    /**
     * 连字符 / 脊柱式命名
     * Kebab Case / Spinal Case
     * e.g. foo-bar
     * 
     * @alias: kebabCase / KebabCase / kebab_case / KEBAB_CASE
     *         spinalCase / SpinalCase / spinal_case / SPINAL_CASE
     * @since 2024-04-02
     */
    KEBAB_CASE,

    /**
     * 下划线 / 蛇形命名
     * Snake Case
     * e.g. foo_bar
     * 
     * @alias: snakeCase / SnakeCase / snake_case / SNAKE_CASE
     * @since 2024-04-02
     */
    SNAKE_CASE,

    /**
     * 下划线大写
     * Snake Upper Case
     * e.g. FOO_BAR
     * 
     * @alias: snakeUpperCase / SnakeUpperCase / snake_upper_case / SNAKE_UPPER_CASE
     * @since 2024-04-02
     */
    SNAKE_UPPER_CASE,

    /**
     * 全大写
     * Upper Case
     * e.g. FOO_BAR / FOOBAR
     * 
     * @alias: upperCase / UpperCase / upper_case / UPPER_CASE
     * @since 2024-04-02
     */
    UPPER_CASE,

    /**
     * 全小写
     * Lower Case
     * e.g. foo_bar / foobar
     * 
     * @alias: lowerCase / LowerCase / lower_case / LOWER_CASE
     * @since 2024-04-02
     */
    LOWER_CASE,

    /**
     * 驼峰蛇形命名
     * Camel Snake Case
     * e.g. Foo_Bar
     * 
     * @alias: camelSnakeCase / CamelSnakeCase / camel_snake_case / CAMEL_SNAKE_CASE
     * @since 2024-04-02
     */
    CAMEL_SNAKE_CASE,
}
