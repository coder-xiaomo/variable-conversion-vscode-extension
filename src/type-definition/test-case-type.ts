import { EOL } from "./convert-function-type";

export type TestCaseGroup = {
    group: string
    testTitle: string
    cases: Array<TestCase>
};

export type TestCase = {
    title: string
    input: string | Array<string>
    eol: EOL | Array<EOL>
    transformText: Array<string>
    output: {
        camelCase: string
        pascalCase: string
        upperCase?: string
        lowerCase?: string
        kebabCase: string
        camelkebabCase: string
        kebabUpperCase: string
    }
};
