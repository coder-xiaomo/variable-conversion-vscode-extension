export type TestCaseGroup = {
    group: string
    testTitle: string
    cases: Array<TestCase>
};

export type TestCase = {
    title: string
    input: string | Array<string>
    transformText: string
    output: {
        camelCase: string
        pascalCase: string
    }
};
