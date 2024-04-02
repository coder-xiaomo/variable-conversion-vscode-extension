import { transformText } from './text-transform';

/**
 * 转小驼峰 to Camel Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export function toCamelCase(str: string): string {
    // 切割文本
    const result = transformText(str);
    console.log('result', result);

    // TODO

    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * 转大驼峰 to Pascal Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export function toPascalCase(str: string): string {
    return str.replace(/(^\w|_\w)/g, (g) => g.toUpperCase().replace('_', ''));
}

/**
 * 转大写 to Upper Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export function toUpperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * 转小写 to Lower Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export function toLowerCase(str: string): string {
    return str.toLowerCase();
}
