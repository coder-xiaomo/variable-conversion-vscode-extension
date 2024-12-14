import { EOL } from "../../../types/EOLType";

export type PathTestCaseGroup = {
    group: string
    testTitle: string
    cases: Array<PathTestCase>
};

export type PathTestOutputResult = {
    unEscape: string;
    escape: string;
};

export type PathTestCase = {
    title: string
    input: string | Array<string>
    eol: EOL | Array<EOL>
    output: {
        Windows: PathTestOutputResult
        Unix: PathTestOutputResult
    }
};
