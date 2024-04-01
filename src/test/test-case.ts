

enum SkipReason {
    /** 空字符串 */
    EMPTY_STRING,
    /** 字符串过长 */
    STRING_TOO_LONG,
    /** 不包含英文字母 */
    NOT_CONTAIN_LETTERS,
}

type TestSkipCase = {
    /** 当 input 不是规范的输入时，isSkip 为 true */
    isSkip: true
    skipReason: SkipReason
};
type TestReplaceCase = {
    isSkip: false
    splitResult: Array<string>
    output: {
        camelCase: string
        pascalCase: string
    }
};
type TestCase = (TestSkipCase | TestReplaceCase) & {
    input: string | Array<string>
};

/*
Have a nice day!
foo--bar
foo -bar
pineApple
*/
const testCase: Array<TestCase> = [
    {
        input:
            ''
        ,
        isSkip: true,
        skipReason: SkipReason.EMPTY_STRING
    },
    {
        input:
            `China's factory activity expanded in March after five consecutive months of contraction, an official survey revealed on Sunday, adding to a run of indicators that suggest the stabilization of the world's second-largest economy.`
        ,
        isSkip: true,
        skipReason: SkipReason.STRING_TOO_LONG
    },
    {
        input:
            `今天是星期日`
        ,
        isSkip: true,
        skipReason: SkipReason.NOT_CONTAIN_LETTERS
    },
    {
        input: [
            'test case',
            'test_case',
            'test-case',
            'testCase',
            'TestCase',
            'TEST_CASE',
        ],
        isSkip: false,
        splitResult: [
            ''
        ],
        output: {
            camelCase: 'testCase',
            pascalCase: 'TestCase',
        }
    },
    {
        input: [
            ' A nice day! ',
            ' a_nice_day! ',
            ' ANiceDay! ',
            ' A_NICE_DAY! ',
            ' A_Nice_DaY ',
            ' A-NiCe_Day ',
            ' A----NiCe_Day_-_-- ',
        ],
        isSkip: false,
        splitResult: [
            ''
        ],
        output: {
            camelCase: ' aNiceDay! ',
            pascalCase: ' ANiceDay! ',
        }
    },
    {
        input: [
            ' A niCe-Day-',
            ' A niceDay',
        ],
        isSkip: false,
        splitResult: [
            ''
        ],
        output: {
            camelCase: ' a niceDay',
            pascalCase: ' A NiceDay',
        }
    },
    {
        input: [
            'Have a nice day!',
            'have a nice day!',
            'Have-a-nice-day!',
            'have-a-nice-day!',
            'HAVE-A-NICE-DAY!',
            'Have_a_nice_day!',
            'have_a_nice_day!',
            'HAVE_A_NICE_DAY!',
            'HaveANiceDay!',
            'haveANiceDay!',
        ],
        isSkip: false,
        splitResult: ['have', 'a', 'nice', 'day', '!'],
        output: {
            camelCase: ' a niceDay',
            pascalCase: ' A NiceDay',
        }
    },
];
