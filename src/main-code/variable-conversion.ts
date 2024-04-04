import { ConvertFunction, EOL } from '../type-definition/convert-function-type';
import { TransformTextResult } from '../type-definition/variable-transform-type';
import { transformMutliLineText, transformText } from './variable-transform';

/**
 * 转小驼峰 to Camel Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export const toCamelCase: ConvertFunction = (str: string, eol: EOL): string => {
    // Cut text 切割文本
    const results: Array<TransformTextResult> = transformMutliLineText(str);
    // console.log('results', results);

    const transformedLines: Array<string> = [];
    for (const result of results) {
        // Post Process 后置处理
        const words = result.trimResult.split('|');
        let isFirstWord: boolean = true;// 用于判断首词小写
        const camelCaseWords: Array<string> = [];
        for (let index = 0; index < words.length; index++) {
            const word = words[index];
            const firstLetter = word.charAt(0);
            const pascalCaseWord = firstLetter.toUpperCase() + word.slice(1);
            if (isFirstWord) {
                camelCaseWords.push(word);
                if (firstLetter !== firstLetter.toUpperCase()) {
                    // 是大写 (A-Z), 再后面的词句不再是首词
                    isFirstWord = false;
                }
            } else {
                camelCaseWords.push(pascalCaseWord);
            }

            if (word === '\n' || word === '\r\n') {
                isFirstWord = true; // 换行后，重新计算首词
            }
        }
        const transformedLine = result.leadingSpace + camelCaseWords.join('') + result.trailingSpace;
        transformedLines.push(transformedLine);
    }
    return transformedLines.join(eol);
    // return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

/**
 * 转大驼峰 to Pascal Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export const toPascalCase: ConvertFunction = (str: string, eol: EOL): string => {
    // Cut text 切割文本
    const results: Array<TransformTextResult> = transformMutliLineText(str);
    // console.log('results', results);

    const transformedLines: Array<string> = [];
    for (const result of results) {
        const words = result.trimResult.split('|');
        const pascalCaseWords = words.map((word, index) => {
            // 首字母大写
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        const transformedLine = result.leadingSpace + pascalCaseWords.join('') + result.trailingSpace;
        transformedLines.push(transformedLine);
    }
    return transformedLines.join(eol);

    // return str.replace(/(^\w|_\w)/g, (g) => g.toUpperCase().replace('_', ''));
};

/**
 * 转连字符 / 脊柱式命名 to Kebab Case / Spinal Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-04-03
*/
export const toKebabCase: ConvertFunction = (str: string, eol: EOL): string => {
    // Cut text 切割文本
    const results: Array<TransformTextResult> = transformMutliLineText(str);
    // console.log('results', results);

    const transformedLines: Array<string> = [];
    for (const result of results) {
        const words = result.trimResult.split('|');

        let isPreviousWordSpecial = true;
        const transformedWords = [];
        for (let index = 0; index < words.length; index++) {
            const word = words[index];

            const isCurrentWordSpecial = !/^[A-Za-z]+$/.test(word);
            if (!isPreviousWordSpecial && !isCurrentWordSpecial) {
                transformedWords.push('-');
            }
            transformedWords.push(word);

            isPreviousWordSpecial = isCurrentWordSpecial;
        }
        const transformedLine = result.leadingSpace + transformedWords.join('') + result.trailingSpace;
        transformedLines.push(transformedLine);
    }
    return transformedLines.join(eol);
};

/**
 * 转驼峰脊柱式命名 to Camel Kebab Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-04-03
*/
export const toCamelKebabCase: ConvertFunction = (str: string, eol: EOL): string => {
    // Cut text 切割文本
    const results: Array<TransformTextResult> = transformMutliLineText(str);
    // console.log('results', results);

    const transformedLines: Array<string> = [];
    for (const result of results) {
        const words = result.trimResult.split('|');

        let isPreviousWordSpecial = true;
        const transformedWords = [];
        for (let index = 0; index < words.length; index++) {
            const word = words[index];

            const isCurrentWordSpecial = !/^[A-Za-z]+$/.test(word);
            if (!isPreviousWordSpecial && !isCurrentWordSpecial) {
                transformedWords.push('-');
            }
            const pascalCaseWord = word.charAt(0).toUpperCase() + word.slice(1);
            transformedWords.push(pascalCaseWord);

            isPreviousWordSpecial = isCurrentWordSpecial;
        }
        const transformedLine = result.leadingSpace + transformedWords.join('') + result.trailingSpace;
        transformedLines.push(transformedLine);
    }
    return transformedLines.join(eol);
};

/**
 * 转连字符大写命名 to Kebab Upper Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-04-03
*/
export const toKebabUpperCase: ConvertFunction = (str: string, eol: EOL): string => {
    return toKebabCase(str, eol).toUpperCase();
};

/**
 * 转大写 to Upper Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
*/
export const toUpperCase: ConvertFunction = (str: string, eol: EOL): string => {
    return str.toUpperCase();
};

/**
 * 转小写 to Lower Case
 *
 * @param {string} str user selection
 * @returns
 * @since 2024-03-28
 */
export const toLowerCase: ConvertFunction = (str: string, eol: EOL): string => {
    return str.toLowerCase();
};
