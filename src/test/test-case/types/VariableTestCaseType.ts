import { EOL } from "../../../types/EOLType";

export type VariableTestCaseGroup = {
    group: string
    testTitle: string
    cases: Array<VariableTestCase>
};

export type VariableTestCase = {
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

        spaceCase: string
        spaceCamelCase: string
        spacePascalCase: string
        spaceUpperCase: string

        dotCase: string
        dotCamelCase: string
        dotPascalCase: string
        dotUpperCase: string

        lowerCase?: string
        upperCase?: string
    }
};
