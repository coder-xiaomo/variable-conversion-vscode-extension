import { transformText } from './text-transform';

/**
 * 转小驼峰 to Camel Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export function toCamelCase(str: string): string {
    // Cut text 切割文本
    let result = transformText(str);
    console.log('result', result);

    // Post Process 后置处理
    const words = result.trimResult.split('|');
    const camelCaseWords = words.map((word, index) => {
        if (index === 0) {
            // 第一个单词保持不变
            return word;
        } else {
            // 其他单词首字母大写
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    return result.leadingSpace + camelCaseWords.join('') + result.trailingSpace;

    // return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * 转大驼峰 to Pascal Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export function toPascalCase(str: string): string {
    // Cut text 切割文本
    let result = transformText(str);
    console.log('result', result);

    // Post Process 后置处理
    const words = result.trimResult.split('|');
    const pascalCaseWords = words.map((word, index) => {
        // 首字母大写
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return result.leadingSpace + pascalCaseWords.join('') + result.trailingSpace;

    // return str.replace(/(^\w|_\w)/g, (g) => g.toUpperCase().replace('_', ''));
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
