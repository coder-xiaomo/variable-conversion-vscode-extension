import { SupportPathFormat } from "./types/SupportPathFormatType";

/** / */
const LEFT_SLASH = '/';
/** \ */
const RIGHT_SLASH = '\\';
/** \\ */
const DOUBLE_RIGHT_SLASH = '\\\\';

export function pathConversion(targetPathType: SupportPathFormat, input: string): string {
    let resultPath;

    let isSeperator = false;
    switch (targetPathType) {
        case SupportPathFormat.Windows:
            // 将其中的 / 替换为 \
            resultPath = Array.from(input).map((char: string) => {
                if (char !== LEFT_SLASH) {
                    // 当前字符不是 /
                    isSeperator = false;
                    return char;
                } else {
                    // 当前字符是 /
                    if (!isSeperator) {
                        // 上一字符不是 /
                        isSeperator = true;
                        return RIGHT_SLASH; // 替换成 \
                    }
                    // 上一字符是 /
                    return '';
                }
            }).join('');
            break;
        case SupportPathFormat.Unix:
            // 将其中的 \\ 和 \ 替换为 /
            resultPath = Array.from(input).map((char: string) => {
                if (char !== RIGHT_SLASH) {
                    // 当前字符不是 \
                    isSeperator = false;
                    return char;
                } else {
                    // 当前字符是 \
                    if (!isSeperator) {
                        // 上一字符不是 \
                        isSeperator = true;
                        return LEFT_SLASH; // 替换成 /
                    }
                    // 上一字符是 \
                    return '';
                }
            }).join('');
            break;
        // case SupportPathFormat.WindowsGitBash:
        //     break;
        default:
            return input;
    }

    return resultPath;
}
