
export type PathTestCaseGroup = {
    group: string
    testTitle: string
    cases: Array<PathTestCase>
};

export type PathTestCase = {
    title: string
    input: string | Array<string>
    output: {
        Windows: string
        Unix: string
    }
};
