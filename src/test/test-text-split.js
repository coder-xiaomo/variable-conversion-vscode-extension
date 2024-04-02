// 请帮我写一个 js 函数，实现如下功能：建议使用正则实现，难以实现的可以使用代码逻辑配合操作
// 统一将所有单词转为小写，连字符转换为|便于后续操作
// 具体转换逻辑：
// - 如果有多个连字符，将其合并为1个连字符，例如 ice-_-cream -> ice|cream
// - 如果连续小写字母存在大写字母，将其拆分为多个单词，例如 TomLikes eat iceCream. -> tom|likes|eat|ice|cream|.
// - 对于1个或连续多个除了A-Z a-z - _ 空格等的特殊字符，或表情符号等，不做处理，将其视为独立单词，例如
//   takeARest😊haPPy,😢triSTE,ENFADADO, 驚きました,❤️, 笑, 😎COol, 😳-Embarrassed
//   -> take|a|rest|😊|ha|p|py|,😢|tri|s|t|e|,|enfadado|,| |驚きました,❤️,| |笑|,| |😎|c|ool|,| |😳|embarrassed

// 注意，你不可以直接用toLowerCase，因为TomLikes eat iceCream. 这种情况下iceCream变成icecream就无法分词了
// 另外，通过检查每个字母，如果它是大写的，我们就在它前面添加一个分隔符，然后再将整个字符串转换为小写，这样也有点问题，比如ENFADADO就会被分开。
// 需要实现 takeARest-> take|a|rest , triSTE -> tri|s|t|e , ENFADADO -> enfadado , COol -> c|ool 或许按照单词首尾字母大小写判断可以解决这个问题？

// 参考思路：只操作修改其中符合我们替换条件的部分，主要是中英文字母-_和空格，可以用正则匹配出来逐一进行操作后再回填回去，对于其他字符部分不做操作？


// 请将如下代码改写成 TypeScript 的格式，并移除 logDebugInfo 参数，需要保留注释内容

const logDebugInfo = false;

function transformText(input) {
    console.log();
    console.log('input  ', '->' + input + '<-');

    // 记录首尾空格
    const leadingSpaces = input.match(/^ +/);
    const trailingSpaces = input.match(/ +$/);

    // 去除首尾空格
    input = input.trim();
    logDebugInfo && console.log('Trimmed input', input);

    // 使用正则表达式匹配中英文字母、连字符、下划线和空格
    let result = input.replace(/([A-Za-z\-_ ]+)/g, (match) => {
        logDebugInfo && console.log('callback', match);

        // 替换连字符为 '|' （如有多个则合并）
        match = match.replace(/[-_ ]+/g, '|');
        logDebugInfo && console.log('match', match);

        // 拆分连续的小写字母和大写字母为多个单词
        match = match.replace(/([a-z])([A-Z])/g, '$1|$2');
        logDebugInfo && console.log('match', match);

        // 分割
        let words = match.split('|');
        logDebugInfo && console.log('words', words);

        // 处理特殊情况，如 'ENFADADO' 不应该被拆分
        words = words.map(word => {
            // if (word.toUpperCase() === word) {
            //     return word.toLowerCase();
            // }
            // return word/*.replace(/([A-Z])/g, '|$1')*/.toLowerCase();
            if (word.toUpperCase() === word && word.length > 1) {
                return word.toLowerCase();
            }
            return word.replace(/([A-Z])/g, '|$1').toLowerCase();
        });
        logDebugInfo && console.log('words', words);

        // 重新组合单词
        return '|' + words.join('|') + '|';
    });
    logDebugInfo && console.log('result', result);

    // 如果有多个 | 将其合并
    result = result.replace(/[\|]+/g, '|');
    logDebugInfo && console.log('result', result);

    // 如果首尾有 | 将其替换掉
    result = result.replace(/(^[\|]+|[\|]+$)/g, '');
    logDebugInfo && console.log('result', result);

    // 还原首尾空格
    // result = (leadingSpaces ? (leadingSpaces[0] + '|') : '') + result + (trailingSpaces ? ('|' + trailingSpaces[0]) : '');
    result = (leadingSpaces ? leadingSpaces[0] : '') + result + (trailingSpaces ? trailingSpaces[0] : '');
    logDebugInfo && console.log('Final result', result);

    console.log('output ', '->' + result + '<-');
    return result;
}

// 示例用法
transformText(' ANiceDay!');
transformText(' A----NiCe_Day_-_-- \'');
transformText('TomLikes eat iceCream.');
transformText('takeARest😊haPPy,😢triSTE,ENFADADO, 驚きました,❤️, 笑, 😎COol, 😳-Embarrassed');
transformText('  Julius_Caesar, William_Shakespeare, Albert_Einstein, Marie_Curie, WolfgangAmadeusMozart, Vincent-van-Gogh. ');
transformText(' 🥰 a-cup/_of Coffee🍻,-_please!. ');
transformText('--担心你dAf_=coffee—爸妈不在家_— ');
transformText('   NHDAs--+90-usz&*  ');

/* 输出：

input   -> ANiceDay!<-
output  -> a|nice|day|!<-

input   -> A----NiCe_Day_-_-- '<-
output  -> a|ni|ce|day|'<-

input   ->TomLikes eat iceCream.<-
output  ->tom|likes|eat|ice|cream|.<-

input   ->takeARest😊haPPy,😢triSTE,ENFADADO, 驚きました,❤️, 笑, 😎COol, 😳-Embarrassed<-
output  ->take|a|rest|😊|ha|p|py|,😢|tri|ste|,|enfadado|,|驚きました,❤️,|笑,|😎|c|ool|,|😳|embarrassed<-

input   ->  Julius_Caesar, William_Shakespeare, Albert_Einstein, Marie_Curie, WolfgangAmadeusMozart, Vincent-van-Gogh. <-
output  ->  julius|caesar|,|william|shakespeare|,|albert|einstein|,|marie|curie|,|wolfgang|amadeus|mozart|,|vincent|van|gogh|. <-

input   -> 🥰 a-cup/_of Coffee🍻,-_please!. <-
output  -> 🥰|a|cup|/|of|coffee|🍻,|please|!. <-

input   ->--担心你dAf_=coffee—爸妈不在家_— <-
output  ->担心你|d|af|=|coffee|—爸妈不在家|— <-

input   ->   NHDAs--+90-usz&*  <-
output  ->   n|h|d|as|+90|usz|&*  <-

*/