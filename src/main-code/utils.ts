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