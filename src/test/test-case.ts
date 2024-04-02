import { TestCaseGroup } from "../type-definition/test-case-type";

const LF = '\n';
const CRLF = '\r\n';

const testGroups: Array<TestCaseGroup> = [
    {
        group: 'Input validation',
        testTitle: 'Input validation (输入有效性验证)',
        cases: [
            // 输入为空
            {
                title: 'empty input',
                input: '',
                eol: [LF, CRLF],
                transformText: [
                    '',
                ],
                output: {
                    camelCase: '',
                    pascalCase: '',
                    upperCase: '',
                    lowerCase: '',
                },
            },
            {
                title: 'empty input (contains space)',
                input: '  ',
                eol: [LF, CRLF],
                transformText: [
                    '  ',
                ],
                output: {
                    camelCase: '  ',
                    pascalCase: '  ',
                    upperCase: '  ',
                    lowerCase: '  ',
                },
            },
            {
                title: 'empty input (contains space and crlf enter 1)',
                input: ' \r\n ',
                eol: [CRLF],
                transformText: [
                    ' ',
                    ' ',
                ],
                output: {
                    camelCase: ' \r\n ',
                    pascalCase: ' \r\n ',
                    upperCase: ' \r\n ',
                    lowerCase: ' \r\n ',
                },
            },
            {
                title: 'empty input (contains space and crlf enter 2)',
                input: ' x \r\ny ',
                eol: [CRLF],
                transformText: [
                    ' x ',
                    'y ',
                ],
                output: {
                    camelCase: ' x \r\ny ',
                    pascalCase: ' X \r\nY ',
                    upperCase: ' X \r\nY ',
                    lowerCase: ' x \r\ny ',
                },
            },
            {
                title: 'empty input (contains space and lf enter 1)',
                input: ' \n ',
                eol: [LF],
                transformText: [
                    ' ',
                    ' ',
                ],
                output: {
                    camelCase: ' \n ',
                    pascalCase: ' \n ',
                    upperCase: ' \n ',
                    lowerCase: ' \n ',
                },
            },
            {
                title: 'empty input (contains space and lf enter 2)',
                input: ' a\nb ',
                eol: [LF],
                transformText: [
                    ' a',
                    'b ',
                ],
                output: {
                    camelCase: ' a\nb ',
                    pascalCase: ' A\nB ',
                    upperCase: ' A\nB ',
                    lowerCase: ' a\nb ',
                },
            },
            // 输入长文本
            {
                title: 'long text input',
                input:
                    `China's factory activity expanded in March after five consecutive months of contraction, an official survey revealed on Sunday, adding to a run of indicators that suggest the stabilization of the world's second-largest economy.`
                ,
                eol: [LF, CRLF],
                transformText: [
                    "china|'|s|factory|activity|expanded|in|march|after|five|consecutive|months|of|contraction|,|an|official|survey|revealed|on|sunday|,|adding|to|a|run|of|indicators|that|suggest|the|stabilization|of|the|world|'|s|second|largest|economy|."
                ],
                output: {
                    camelCase:
                        "china'SFactoryActivityExpandedInMarchAfterFiveConsecutiveMonthsOfContraction,AnOfficialSurveyRevealedOnSunday,AddingToARunOfIndicatorsThatSuggestTheStabilizationOfTheWorld'SSecondLargestEconomy."
                    ,
                    pascalCase:
                        "China'SFactoryActivityExpandedInMarchAfterFiveConsecutiveMonthsOfContraction,AnOfficialSurveyRevealedOnSunday,AddingToARunOfIndicatorsThatSuggestTheStabilizationOfTheWorld'SSecondLargestEconomy."
                    ,
                    upperCase:
                        "CHINA'S FACTORY ACTIVITY EXPANDED IN MARCH AFTER FIVE CONSECUTIVE MONTHS OF CONTRACTION, AN OFFICIAL SURVEY REVEALED ON SUNDAY, ADDING TO A RUN OF INDICATORS THAT SUGGEST THE STABILIZATION OF THE WORLD'S SECOND-LARGEST ECONOMY."
                    ,
                    lowerCase:
                        "china's factory activity expanded in march after five consecutive months of contraction, an official survey revealed on sunday, adding to a run of indicators that suggest the stabilization of the world's second-largest economy."
                    ,
                },
            },
            // 输入包含数字
            {
                title: 'text and number input',
                input: 'entity2Map',
                eol: [LF, CRLF],
                transformText: [
                    'entity|2|map',
                ],
                output: {
                    camelCase: 'entity2Map',
                    pascalCase: 'Entity2Map',
                    upperCase: 'ENTITY2MAP',
                    lowerCase: 'entity2map',
                },
            },
            // 输入包含换行
            {
                title: 'enter input',
                input:
                    'How do you\bdo?\n                    How do you\tdo!'
                ,
                eol: [LF],
                transformText: [
                    'how|do|you|\b|do|?',
                    '                    how|do|you|\t|do|!',
                ],
                output: {
                    camelCase: 'howDoYou\bDo?\n                    howDoYou\tDo!',
                    pascalCase: 'HowDoYou\bDo?\n                    HowDoYou\tDo!',
                    upperCase: 'HOW DO YOU\bDO?\n                    HOW DO YOU\tDO!',
                    lowerCase: 'how do you\bdo?\n                    how do you\tdo!',
                },
            },
            // 非英文字符，特殊字符
            {
                title: 'Chinese input 1',
                input:
                    '今天是星期日'
                ,
                eol: [LF, CRLF],
                transformText: [
                    '今天是星期日',
                ],
                output: {
                    camelCase: '今天是星期日',
                    pascalCase: '今天是星期日',
                    upperCase: '今天是星期日',
                    lowerCase: '今天是星期日',
                },
            },
            {
                title: 'Chinese input 2',
                input:
                    '--担心你dAf_=coffee—爸妈不在家_— '
                ,
                eol: [LF, CRLF],
                transformText: [
                    '担心你|d|af|=|coffee|—爸妈不在家|— ',
                ],
                output: {
                    camelCase: '担心你dAf=Coffee—爸妈不在家— ',
                    pascalCase: '担心你DAf=Coffee—爸妈不在家— ',
                    upperCase: '--担心你DAF_=COFFEE—爸妈不在家_— ',
                    lowerCase: '--担心你daf_=coffee—爸妈不在家_— ',
                },
            },
            {
                title: 'Special character with emoji input',
                input:
                    '🥰 a-cup/_of Coffee🍻,-_please!. '
                ,
                eol: [LF, CRLF],
                transformText: [
                    '🥰|a|cup|/|of|coffee|🍻,|please|!. ',
                ],
                output: {
                    camelCase: '🥰aCup/OfCoffee🍻,Please!. ',
                    pascalCase: '🥰ACup/OfCoffee🍻,Please!. ',
                    upperCase: '🥰 A-CUP/_OF COFFEE🍻,-_PLEASE!. ',
                    lowerCase: '🥰 a-cup/_of coffee🍻,-_please!. ',
                },
            },
            {
                title: 'Special character with multiple input',
                input:
                    'takeARest😊haPPy,😢triSTE,ENFADADO, 驚きました,❤️, 笑, 😎COol, 😳-Embarrassed'
                ,
                eol: [LF, CRLF],
                transformText: [
                    'take|a|rest|😊|ha|p|py|,😢|tri|ste|,|enfadado|,|驚きました,❤️,|笑,|😎|c|ool|,|😳|embarrassed',
                ],
                output: {
                    camelCase: 'takeARest😊HaPPy,😢TriSte,Enfadado,驚きました,❤️,笑,😎COol,😳Embarrassed',
                    pascalCase: 'TakeARest😊HaPPy,😢TriSte,Enfadado,驚きました,❤️,笑,😎COol,😳Embarrassed',
                    upperCase: 'TAKEAREST😊HAPPY,😢TRISTE,ENFADADO, 驚きました,❤️, 笑, 😎COOL, 😳-EMBARRASSED',
                    lowerCase: 'takearest😊happy,😢triste,enfadado, 驚きました,❤️, 笑, 😎cool, 😳-embarrassed',
                },
            },
            {
                title: 'Random input',
                input:
                    '    NHDAs--+90-usz&* '
                ,
                eol: [LF, CRLF],
                transformText: [
                    '    n|h|d|as|+90|usz|&* ',
                ],
                output: {
                    camelCase: '    nHDAs+90Usz&* ',
                    pascalCase: '    NHDAs+90Usz&* ',
                    upperCase: '    NHDAS--+90-USZ&* ',
                    lowerCase: '    nhdas--+90-usz&* ',
                },
            },
            {
                title: 'Mixed input 1',
                input:
                    '--担心你鸿dAf_=coffee—_— '
                ,
                eol: [LF, CRLF],
                transformText: [
                    '担心你鸿|d|af|=|coffee|—|— ',
                ],
                output: {
                    camelCase: '担心你鸿dAf=Coffee—— ',
                    pascalCase: '担心你鸿DAf=Coffee—— ',
                    upperCase: '--担心你鸿DAF_=COFFEE—_— ',
                    lowerCase: '--担心你鸿daf_=coffee—_— ',
                },
            },
            {
                title: 'Mixed input 2',
                input:
                    'fsdi_sdacsaf+desd'
                ,
                eol: [LF, CRLF],
                transformText: [
                    'fsdi|sdacsaf|+|desd',
                ],
                output: {
                    camelCase: 'fsdiSdacsaf+Desd',
                    pascalCase: 'FsdiSdacsaf+Desd',
                    upperCase: 'FSDI_SDACSAF+DESD',
                    lowerCase: 'fsdi_sdacsaf+desd',
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
                eol: [LF, CRLF],
                transformText: [
                    'foo|bar',
                ],
                output: {
                    camelCase: 'fooBar',
                    pascalCase: 'FooBar',
                    // upperCase: 'FOO--BAR',
                    // lowerCase: 'foo--bar',
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
                eol: [LF, CRLF],
                transformText: [
                    'test|case',
                ],
                output: {
                    camelCase: 'testCase',
                    pascalCase: 'TestCase',
                    // upperCase: 'TEST CASE',
                    // lowerCase: 'test case',
                },
            },
            {
                title: 'Normal input (apple)',
                input: [
                    'apple',
                    'APPLE',
                    'Apple',
                ],
                eol: [LF, CRLF],
                transformText: [
                    'apple',
                ],
                output: {
                    camelCase: 'apple',
                    pascalCase: 'Apple',
                    upperCase: 'APPLE',
                    lowerCase: 'apple',
                },
            },
            {
                title: 'Normal input (pine-apple)',
                input: [
                    'pineApple',
                ],
                eol: [LF, CRLF],
                transformText: [
                    'pine|apple',
                ],
                output: {
                    camelCase: 'pineApple',
                    pascalCase: 'PineApple',
                    upperCase: 'PINEAPPLE',
                    lowerCase: 'pineapple',
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
                eol: [LF, CRLF],
                transformText: [
                    'have|a|nice|day|!',
                ],
                output: {
                    camelCase: 'haveANiceDay!',
                    pascalCase: 'HaveANiceDay!',
                    // upperCase: 'HAVE A NICE DAY!',
                    // lowerCase: 'have a nice day!',
                },
            },
            {
                title: 'Normal input (a-nice-day!)',
                input: [
                    ' A nice day! ',
                    ' a_nice_day! ',
                    ' ANiceDay! ',
                    ' A_NICE_DAY! ',
                    // ' A_Nice_DaY! ',
                    // ' A-NiCe_Day! ',
                    // ' A----NiCe_Day_-_!-- ',
                    ' A----NICE_Day_-_!-- ',
                ],
                eol: [LF, CRLF],
                transformText: [
                    ' a|nice|day|! ',
                ],
                output: {
                    camelCase: ' aNiceDay! ',
                    pascalCase: ' ANiceDay! ',
                    // upperCase: ' A NICE DAY! ',
                    // lowerCase: ' a nice day! ',
                },
            },
            {
                title: 'Normal input (a-nice-day)',
                input: [
                    ' A NICE-Day-',
                    ' A niceDay',
                ],
                eol: [LF, CRLF],
                transformText: [
                    ' a|nice|day',
                ],
                output: {
                    camelCase: ' aNiceDay',
                    pascalCase: ' ANiceDay',
                    // upperCase: ' A NICE-DAY-',
                    // lowerCase: ' a nice-day-',
                },
            },
            {
                title: 'Normal input (tom-likes-eat-ice-cream)',
                input: [
                    'TomLikes eat iceCream.',
                ],
                eol: [LF, CRLF],
                transformText: [
                    'tom|likes|eat|ice|cream|.',
                ],
                output: {
                    camelCase: 'tomLikesEatIceCream.',
                    pascalCase: 'TomLikesEatIceCream.',
                    upperCase: 'TOMLIKES EAT ICECREAM.',
                    lowerCase: 'tomlikes eat icecream.',
                },
            },
            {
                title: 'Normal input (apple-2-Tree)',
                input: [
                    ' apple2-Tree ',
                    // ' apple2Tree ',
                ],
                eol: [LF, CRLF],
                transformText: [
                    ' apple|2|tree ',
                ],
                output: {
                    camelCase: ' apple2Tree ',
                    pascalCase: ' Apple2Tree ',
                    upperCase: ' APPLE2-TREE ',
                    lowerCase: ' apple2-tree ',
                },
            },
            {
                title: 'Normal input (Julius-Caesar, William-Shakespeare, ...)',
                input:
                    ' Julius_Caesar, William_Shakespeare, Albert_Einstein, Marie_Curie, WolfgangAmadeusMozart, Vincent-van-Gogh. '
                ,
                eol: [LF, CRLF],
                transformText: [
                    ' julius|caesar|,|william|shakespeare|,|albert|einstein|,|marie|curie|,|wolfgang|amadeus|mozart|,|vincent|van|gogh|. ',
                ],
                output: {
                    camelCase: ' juliusCaesar,WilliamShakespeare,AlbertEinstein,MarieCurie,WolfgangAmadeusMozart,VincentVanGogh. ',
                    pascalCase: ' JuliusCaesar,WilliamShakespeare,AlbertEinstein,MarieCurie,WolfgangAmadeusMozart,VincentVanGogh. ',
                    upperCase: ' JULIUS_CAESAR, WILLIAM_SHAKESPEARE, ALBERT_EINSTEIN, MARIE_CURIE, WOLFGANGAMADEUSMOZART, VINCENT-VAN-GOGH. ',
                    lowerCase: ' julius_caesar, william_shakespeare, albert_einstein, marie_curie, wolfgangamadeusmozart, vincent-van-gogh. ',
                },
            },
            {
                title: 'Normal input (&quot;You&quot; (or &quot;Your&quot;) ...)',
                input:
                    '      &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity\n' +
                    '      exercising permissions granted by this License.'
                ,
                eol: [LF],
                transformText: [
                    '      &|quot|;|you|&|quot|;|(|or|&|quot|;|your|&|quot|;)|shall|mean|an|individual|or|legal|entity',
                    '      exercising|permissions|granted|by|this|license|.',
                ],
                output: {
                    camelCase:
                        '      &quot;You&Quot;(Or&Quot;Your&Quot;)ShallMeanAnIndividualOrLegalEntity\n' +
                        '      exercisingPermissionsGrantedByThisLicense.'
                    ,
                    pascalCase:
                        '      &Quot;You&Quot;(Or&Quot;Your&Quot;)ShallMeanAnIndividualOrLegalEntity\n' +
                        '      ExercisingPermissionsGrantedByThisLicense.'
                    ,
                    upperCase:
                        '      &QUOT;YOU&QUOT; (OR &QUOT;YOUR&QUOT;) SHALL MEAN AN INDIVIDUAL OR LEGAL ENTITY\n' +
                        '      EXERCISING PERMISSIONS GRANTED BY THIS LICENSE.'
                    ,
                    lowerCase:
                        '      &quot;you&quot; (or &quot;your&quot;) shall mean an individual or legal entity\n' +
                        '      exercising permissions granted by this license.'
                    ,
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
            //     eol: [LF, CRLF],
            //     transformText: [
            //         '',
            //     ],
            //     output: {
            //         camelCase: '',
            //         pascalCase: '',
            //         upperCase: '',
            //         lowerCase: '',
            //     },
            // },
            // add more cases...
        ],
    },
    // add more cases...
];

export default testGroups;