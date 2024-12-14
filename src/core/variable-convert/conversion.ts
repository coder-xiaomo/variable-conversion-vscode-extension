import { EOL } from '../../types/EOLType';
import { SupportVariableCase } from './types/SupportVariableCaseType';
import { TransformTextResult } from '../../types/TransformTextResultType';
import { transformMutliLineText, transformText } from '../../utils/transform';

/**
 * 统一文本转换函数
 *
 * @param {SupportVariableCase} targetCase 目标文本情况
 * @param {string} str 用户选择的文本 user selection
 * @param {EOL} eol 行结束符
 * @param {Array<TransformTextResult>?} cutText 行结束符
 * @returns 转换后的文本
 * @since 2024-04-04
 */
export function caseConversion(targetCase: SupportVariableCase, str: string, eol: EOL, cutText: Array<TransformTextResult> | undefined = undefined): string {
    let spaceCharacter: '-' | '_' | ' ' | '.' | undefined = undefined;
    switch (targetCase) {
        default:
        case SupportVariableCase.CAMEL_CASE:        // 小驼峰(驼峰)命名
        case SupportVariableCase.PASCAL_CASE:       // 大驼峰(帕斯卡)命名
            spaceCharacter = undefined;
            break;
        case SupportVariableCase.SNAKE_CASE:        // 下划线(蛇形)命名
        case SupportVariableCase.SNAKE_CAMEL_CASE:  // 下划线(蛇形) + 小驼峰(驼峰)命名
        case SupportVariableCase.SNAKE_PASCAL_CASE: // 下划线(蛇形) + 大驼峰(帕斯卡)命名
        case SupportVariableCase.SNAKE_UPPER_CASE:  // 下划线(蛇形) + 全大写命名
            spaceCharacter = '_';
            break;
        case SupportVariableCase.KEBAB_CASE:        // 中划线(连字符/脊柱式)命名
        case SupportVariableCase.KEBAB_CAMEL_CASE:  // 中划线(连字符/脊柱式) + 小驼峰(驼峰)命名
        case SupportVariableCase.KEBAB_PASCAL_CASE: // 中划线(连字符/脊柱式) + 大驼峰(帕斯卡)命名
        case SupportVariableCase.KEBAB_UPPER_CASE:  // 中划线(连字符/脊柱式) + 全大写命名
            spaceCharacter = '-';
            break;
        case SupportVariableCase.SPACE_CASE:        // 空格分隔命名
        case SupportVariableCase.SPACE_CAMEL_CASE:  // 空格分隔 + 小驼峰(驼峰)命名
        case SupportVariableCase.SPACE_PASCAL_CASE: // 空格分隔 + 大驼峰(帕斯卡)命名
        case SupportVariableCase.SPACE_UPPER_CASE:  // 空格分隔 + 全大写命名
            spaceCharacter = ' ';
            break;
        case SupportVariableCase.DOT_CASE:          // 点分隔命名
        case SupportVariableCase.DOT_CAMEL_CASE:    // 点分隔 + 小驼峰(驼峰)命名
        case SupportVariableCase.DOT_PASCAL_CASE:   // 点分隔 + 大驼峰(帕斯卡)命名
        case SupportVariableCase.DOT_UPPER_CASE:    // 点分隔 + 全大写命名
            spaceCharacter = '.';
            break;
        case SupportVariableCase.LOWER_CASE:        // 全小写
            return str.toLowerCase();
        case SupportVariableCase.UPPER_CASE:        // 全大写
            return str.toUpperCase();
    }

    // Cut text 切割文本
    const results: Array<TransformTextResult> = cutText === undefined ? transformMutliLineText(str) : cutText;
    // console.log('results', results);

    const transformedLines: Array<string> = [];
    for (const result of results) {
        // Post Process 后置处理
        const words = result.trimResult.split('|');

        let isFirstWord: boolean = true;// [驼峰写法] 用于判断首词小写
        let isPreviousWordSpecial = true; // 用于判断上一个词是 单词 or 特殊字符
        const transformedWords: Array<string> = [];
        for (let index = 0; index < words.length; index++) {
            const word = words[index];

            const firstLetter = word.charAt(0);
            const pascalCaseWord = firstLetter.toUpperCase() + word.slice(1);

            // 当前 word 是否是特殊单词
            // const isCurrentWordNormal = firstLetter !== firstLetter.toUpperCase(); // 是小写 a-z (不是特殊字符)
            const isCurrentWordNormal = /^[A-Za-z]+$/.test(word);
            // /^[A-Za-z]+$/.test("") false
            // /^[A-Za-z]+$/.test("苹果") true
            // /^[A-Za-z]+$/.test("apple") true
            const isCurrentWordSpecial = !isCurrentWordNormal;

            // 添加连字符
            if (!isPreviousWordSpecial && !isCurrentWordSpecial) {
                spaceCharacter !== undefined
                    && transformedWords.push(spaceCharacter);
            }

            // 根据目标情况转换单词
            switch (targetCase) {
                case SupportVariableCase.CAMEL_CASE:        // 小驼峰(驼峰)命名
                case SupportVariableCase.SNAKE_CAMEL_CASE:  // 下划线(蛇形) + 小驼峰(驼峰)命名
                case SupportVariableCase.KEBAB_CAMEL_CASE:  // 中划线(连字符/脊柱式) + 小驼峰(驼峰)命名
                case SupportVariableCase.SPACE_CAMEL_CASE:  // 空格分隔 + 小驼峰(驼峰)命名
                case SupportVariableCase.DOT_CAMEL_CASE:    // 点分隔 + 小驼峰(驼峰)命名
                    if (isFirstWord) {
                        transformedWords.push(word);
                        if (isCurrentWordNormal) {
                            isFirstWord = false;
                        }
                    } else {
                        transformedWords.push(pascalCaseWord);
                    }
                    break;
                case SupportVariableCase.PASCAL_CASE:       // 大驼峰(帕斯卡)命名
                case SupportVariableCase.SNAKE_PASCAL_CASE: // 下划线(蛇形) + 大驼峰(帕斯卡)命名
                case SupportVariableCase.KEBAB_PASCAL_CASE: // 中划线(连字符/脊柱式) + 大驼峰(帕斯卡)命名
                case SupportVariableCase.SPACE_PASCAL_CASE: // 空格分隔 + 大驼峰(帕斯卡)命名
                case SupportVariableCase.DOT_PASCAL_CASE:   // 点分隔 + 大驼峰(帕斯卡)命名
                    transformedWords.push(pascalCaseWord);
                    break;
                case SupportVariableCase.SNAKE_CASE:        // 下划线(蛇形)命名
                case SupportVariableCase.KEBAB_CASE:        // 中划线(连字符/脊柱式)命名
                case SupportVariableCase.SPACE_CASE:        // 空格分隔命名
                case SupportVariableCase.DOT_CASE:          // 点分隔命名
                    transformedWords.push(word);
                    break;
                case SupportVariableCase.SNAKE_UPPER_CASE:  // 下划线(蛇形) + 全大写命名
                case SupportVariableCase.KEBAB_UPPER_CASE:  // 中划线(连字符/脊柱式) + 全大写命名
                case SupportVariableCase.SPACE_UPPER_CASE:  // 空格分隔 + 全大写命名
                case SupportVariableCase.DOT_UPPER_CASE:    // 点分隔 + 全大写命名
                    transformedWords.push(word.toUpperCase());
                    break;
                default:
                    throw new Error(`Unsupported case: ${targetCase}`);
            }

            if (word === '\n' || word === '\r\n') {
                isFirstWord = true; // 换行后，重新计算首词
            }

            isPreviousWordSpecial = isCurrentWordSpecial;
        }

        const transformedLine = result.leadingSpace + transformedWords.join('') + result.trailingSpace;
        transformedLines.push(transformedLine);
    }
    return transformedLines.join(eol);
}
