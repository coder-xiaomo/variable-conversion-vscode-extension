
const handlerList = [];
/**
 * 小驼峰处理中间件
 * 
 * @param str 
 * @since 2024-03-29
 */
const camelCaseHandler = (str: string) => {
    // 是否是小驼峰
    const regexp = /^$/g; // need done
    // if()
};
handlerList.push(camelCaseHandler);

/**
 * 小驼峰处理中间件
 * 
 * @param str 
 * @since 2024-03-29
 */
const pascalCaseHandler = (str: string) => {
    // 是否是小驼峰
    const regexp = /^$/g; // need done
};
handlerList.push(pascalCaseHandler);

type SplitFailResult = {
    success: false
    errMsg: string
};

type SplitSuccessResult = {
    success: true
    result: Array<string>
};

type SplitResult = SplitFailResult | SplitSuccessResult;

/**
 * 分词
 * 
 * @param str 
 * @since 2024-03-29
 */
export function splitWord(str: string): SplitResult {
    // check parameter type
    if (typeof str !== 'string') {
        return { success: false, errMsg: `str is not string, type: ${typeof str}` };
    }

    // check parameter length
    if (str.length === 0) {
        return { success: false, errMsg: 'str is empty string.' };
    }
    else if (str.length > 64) {
        return { success: false, errMsg: 'str is too long, it does not appear to be an acceptable input.' };
    }

    // check whether the input matches the criteria
    // 是否包含空格
    const isContainSpace = str.indexOf(' ') !== -1;
    // 是否包含连字符
    const isContainHyphen = str.indexOf('-') !== -1;
    // 是否包含下划线
    const isContainUnderline = str.indexOf('_') !== -1;
    // 是否包含除空格外的其他连字符 (检查字符串是否包含 - 或 _ ，并且不包含空格)
    const isContainSeparator =  /^[^\s]*[-_]+[^\s]*$/.test(str);

    // 是否是小驼峰命名法
    const isCamelCase = /^[a-z][a-zA-Z]*$/;
    // 是否是大驼峰命名法
    const isPascalCase = /^[A-Z][a-zA-Z]*$/;
    // 是否包含大写字母
    const isContainUpperCaseLetter = /[A-Z]/.test(str);
    // 是否包含小写字母
    const isContainLowerCaseLetter = /[a-z]/.test(str);
    // 是否包含字母
    const isContainLetter = /[a-zA-Z]/.test(str);

    return { success: true, result: [] };
}

const result = splitWord('hello world');
if (result.success) {
    console.log('success!', result.result);
} else {
    console.log('skip!', result.errMsg);
}