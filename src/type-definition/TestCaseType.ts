import { EOL } from "./EOLType";

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
        snakeCase: string
        snakeCamelCase: string
        snakePascalCase: string
        snakeUpperCase: string
        kebabCase: string
        kebabCamelCase: string
        kebabPascalCase: string
        kebabUpperCase: string
        lowerCase?: string
        upperCase?: string
    }
};
