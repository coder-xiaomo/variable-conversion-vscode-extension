import { TransformTextResult } from "../types/TransformTextResultType";

const logDebugInfo = false;

/**
 * 多选区分词
 *
 * @param multiSelectionInputs
 * @returns
 * @since 2024-04-03
 */
export function transformMutliSelectionText(selectionInputs: string[]): Array<TransformTextResult[]> {
    return selectionInputs.map(selectionInput => transformMutliLineText(selectionInput));
}

/**
 * 多行内容分词(单一选区)
 *
 * @param multiLineInput
 * @returns
 * @since 2024-04-03
 */
export function transformMutliLineText(multiLineInput: string): TransformTextResult[] {
    const results: TransformTextResult[] = [];
    const lines = multiLineInput.split(/\r?\n/);
    for (const line of lines) {
        // console.log('line', '->' + line + '<-');
        results.push(transformText(line));
    }
    return results;
}

/**
 * 独立段落单元分词 (不包含换行)
 *
 * @param str
 * @since 2024-04-02
 */
export function transformText(input: string): TransformTextResult {
    logDebugInfo && console.log('input  ', '->' + input + '<-');

    // 记录首尾空格
    const leadingSpaces = input.match(/^ +/);
    const trailingSpaces = /^[ ]+$/.test(input)
        ? '' // 字符串全为空格时，将尾空格置为空字符串
        : input.match(/ +$/);

    // 去除首尾空格
    // 不可以使用 input = input.trim(); 否则换行会被替换掉
    input = input.replace(/^ +| +$/g, '');

    // 使用正则表达式匹配中英文字母、连字符、下划线、空格
    let result = input.replace(/([A-Za-z\-_ ]+)/g, (match: string) => {
        // 替换连字符为 '|' （如有多个则合并）
        match = match.replace(/[-_ ]+/g, '|');

        // // 替换.时跳过连续点(例如Happy.. angry)
        // match = match.replace(/([^.])([.])([^.])/g, '$1|$3');

        // 拆分连续的小写字母和大写字母为多个单词
        match = match.replace(/([a-z])([A-Z])/g, '$1|$2');

        // 分割
        let words = match.split('|');

        // 处理特殊情况，如 'ENFADADO' 不应该被拆分
        words = words.map(word => {
            if (word.toUpperCase() === word && word.length > 1) {
                return word.toLowerCase();
            }
            return word.replace(/([A-Z])/g, '|$1').toLowerCase();
        });

        // 重新组合单词
        return '|' + words.join('|') + '|';
    });

    // 如果有多个 | 将其合并
    result = result.replace(/[\|]+/g, '|');

    // 如果首尾有 | 将其替换掉
    result = result.replace(/(^[\|]+|[\|]+$)/g, '');

    // 还原首尾空格
    const leadingSpaceStr = leadingSpaces ? leadingSpaces[0] : '';
    const trailingSpaceStr = trailingSpaces ? trailingSpaces[0] : '';
    let noTrimResult = leadingSpaceStr + result + trailingSpaceStr;

    logDebugInfo && console.log('output ', '->' + result + '<-');
    return {
        leadingSpace: leadingSpaceStr,
        trailingSpace: trailingSpaceStr,
        result: noTrimResult,
        trimResult: result,
    };
}
