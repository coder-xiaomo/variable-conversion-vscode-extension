/**
 * 比较两个字符串数组 `Array<string>` 是否相同
 *
 * @param array1 数组1
 * @param array2 数组2
 * @returns
 * @since 2024-04-09
 */
export function isStringArrayEqual(array1: string[], array2: string[]) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let index = 0; index < array1.length; index++) {
        const element1 = array1[index];
        const element2 = array2[index];
        if (element1 !== element2) {
            return false;
        }
    }
    return true;
}

/**
 * 去除二维字符串数组中的重复数组元素
 *
 * 例如，输入 [["a", "b"], ["a", "b"], ["c", "d"]]，会返回 [[ "a", "b"], ["c", "d"]]，去除了重复出现的 ["a", "b"]。
 *
 * @param stringArr 要进行去重操作的二维字符串数组，即数组中每个元素又是一个字符串数组，代表一组相关的字符串元素集合。
 * @returns 返回一个二维字符串数组，其中已经去除了原输入二维数组中重复的元素组合，基于JSON序列化后的字符串比较来判定重复与否。
 * @since 2024-04-09
 */
export function stringListArrayDuplicateRemoval(stringArr: Array<string[]>): Array<string[]> {
    const tempArr: Array<string> = [];
    const newArr: Array<string[]> = [];
    for (let index = 0; index < stringArr.length; index++) {
        const element = stringArr[index];
        const elementStr = JSON.stringify(element);
        if (!tempArr.includes(elementStr)) {
            newArr.push(element);
            tempArr.push(elementStr);
        }
    }
    return newArr;
}
