/**
 * 转小驼峰 to Camel Case
 * 
 * @param {string} str user selection
 * @returns 
 */
export function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * 转大驼峰 to Pascal Case
 * 
 * @param {string} str user selection
 * @returns 
 */
export function toPascalCase(str: string): string {
    return str.replace(/(^\w|_\w)/g, (g) => g.toUpperCase().replace('_', ''));
}

/**
 * 转大写 to Upper Case
 * 
 * @param {string} str user selection
 * @returns 
 */
export function toUpperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * 转小写 to Lower Case
 * 
 * @param {string} str user selection
 * @returns 
 */
export function toLowerCase(str: string): string {
    return str.toLowerCase();
}
