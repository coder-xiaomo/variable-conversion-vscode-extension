
const logDebugInfo = false;

/**
 * 分词
 *
 * @param str
 * @since 2024-04-02
 */
export function transformText(input: string): string {
    logDebugInfo && console.log('input  ', '->' + input + '<-');

    // 记录首尾空格
    const leadingSpaces = input.match(/^ +/);
    const trailingSpaces = input.match(/ +$/);

    // 去除首尾空格
    input = input.trim();

    // 使用正则表达式匹配中英文字母、连字符、下划线和空格
    let result = input.replace(/([A-Za-z\-_ ]+)/g, (match: string) => {

        // 替换连字符为 '|' （如有多个则合并）
        match = match.replace(/[-_ ]+/g, '|');

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
    // result = (leadingSpaces ? (leadingSpaces[0] + '|') : '') + result + (trailingSpaces ? ('|' + trailingSpaces[0]) : '');
    result = (leadingSpaces ? leadingSpaces[0] : '') + result + (trailingSpaces ? trailingSpaces[0] : '');

    logDebugInfo && console.log('output ', '->' + result + '<-');
    return result;
}
