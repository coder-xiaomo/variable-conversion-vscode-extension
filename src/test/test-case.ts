import { TestCaseGroup } from "../type-definition/test-case-type";

const testGroups: Array<TestCaseGroup> = [
    {
        group: 'Input validation',
        testTitle: 'Input validation (输入有效性验证)',
        cases: [
            // 输入为空
            {
                title: 'empty input',
                input: '',
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            {
                title: 'empty input (contains space)',
                input: '  ',
                transformText: '  ',
                output: {
                    camelCase: '  ',
                    pascalCase: '  ',
                },
            },
            // 输入长文本
            {
                title: 'long text input',
                input:
                    `China's factory activity expanded in March after five consecutive months of contraction, an official survey revealed on Sunday, adding to a run of indicators that suggest the stabilization of the world's second-largest economy.`
                ,
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            // 输入包含换行
            {
                title: 'enter input',
                input:
                    `How do you\bdo?
                    How do you\tdo!
                    `
                ,
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            // 非英文字符，特殊字符
            {
                title: 'Chinese input',
                input:
                    '今天是星期日'
                ,
                transformText: '',
                output: {
                    camelCase: '今天是星期日',
                    pascalCase: '今天是星期日',
                },
            },
            {
                title: 'Special character with emoji input',
                input:
                    '🥰 a-cup/_of Coffee🍻,-_please!. '
                ,
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            {
                title: 'Random input',
                input:
                    '    NHDAs--+90-usz&* '
                ,
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            {
                title: 'Mixed input 1',
                input:
                    '--担心你鸿dAf_=coffee—_— '
                ,
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            {
                title: 'Mixed input 2',
                input:
                    'fsdi_sdacsaf+desd'
                ,
                transformText: '',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            // add more cases...
        ],
    },
    {
        group: 'Functional verification',
        testTitle: 'Functional verification (功能验证)',
        cases: [
            // 正常输入
            {
                title: 'Normal input (foo-bar)',
                input: [
                    'foo--bar',
                    '-foo -bar',
                    '__foo - _bar-__',
                ],
                transformText: 'foo|bar',
                output: {
                    camelCase: 'fooBar',
                    pascalCase: 'FooBar',
                },
            },
            {
                title: 'Normal input (test-case)',
                input: [
                    'test case',
                    'test_case',
                    'test-case',
                    'testCase',
                    'TestCase',
                    'TEST_CASE',
                ],
                transformText: 'test|case',
                output: {
                    camelCase: 'testCase',
                    pascalCase: 'TestCase',
                },
            },
            {
                title: 'Normal input (pine-apple)',
                input: [
                    'pineApple',
                ],
                transformText: 'pine|apple',
                output: {
                    camelCase: 'pineApple',
                    pascalCase: 'PineApple',
                },
            },
            {
                title: 'Normal input (have-a-nice-day!)',
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
                transformText: 'have|a|nice|day|!',
                output: {
                    camelCase: 'haveANiceDay!',
                    pascalCase: 'HaveANiceDay!',
                },
            },
            {
                title: 'Normal input (a-nice-day!)',
                input: [
                    ' A nice day! ',
                    ' a_nice_day! ',
                    ' ANiceDay! ',
                    ' A_NICE_DAY! ',
                    ' A_Nice_DaY! ',
                    ' A-NiCe_Day! ',
                    ' A----NiCe_Day_-_!-- ',
                ],
                transformText: ' a|nice|day|! ',
                output: {
                    camelCase: ' aNiceDay! ',
                    pascalCase: ' ANiceDay! ',
                },
            },
            {
                title: 'Normal input (a-nice-day)',
                input: [
                    ' A niCe-Day-',
                    ' A niceDay',
                ],
                transformText: ' a|nice|day',
                output: {
                    camelCase: ' a niceDay',
                    pascalCase: ' A NiceDay',
                },
            },
            {
                title: 'Normal input (Julius-Caesar, William-Shakespeare, ...)',
                input:
                    ' Julius_Caesar, William_Shakespeare, Albert_Einstein, Marie_Curie, WolfgangAmadeusMozart, Vincent-van-Gogh. '
                ,
                transformText: ' julius|caesar|,|william|shakespeare|,|albert|einstein|,|marie|curie|,|wolfgang|amadeus|mozart|,|vincent|van|gogh|. ',
                output: {
                    camelCase: '',
                    pascalCase: '',
                },
            },
            {
                title: 'Normal input (&quot;You&quot; (or &quot;Your&quot;) ...)',
                input:
                    [
                        `      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity`,
                        `      exercising permissions granted by this License.`
                    ].join('\n')
                ,
                transformText: '      &|quot|;|you|&|quot|;|(|or|&|quot|;|your|&|quot|;)|shall|mean|an|individual|or|legal|entity|\n|exercising|permissions|granted|by|this|license|.',
                output: {
                    camelCase: '      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity\n      exercising permissions granted by this License.',
                    pascalCase: '      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity\n      exercising permissions granted by this License.',
                },
            },
            // add more cases...
        ],
    },
    {
        group: 'Extreme case verification',
        testTitle: 'Extreme case verification (极端情况验证)',
        cases: [
            // 极端情况

            // add more cases...
        ],
    },
    {
        group: 'Xxxx verification',
        testTitle: 'Xxxx verification (xxx验证)',
        cases: [
            // Description
            // {
            //     title: 'Normal input ( ...)',
            //     input: '',
            //     transformText: '',
            //     output: {
            //         camelCase: '',
            //         pascalCase: ''
            //     }
            // },
            // add more cases...
        ],
    },
    // add more cases...
];

export default testGroups;