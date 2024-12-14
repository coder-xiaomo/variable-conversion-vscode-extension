import { PathTestCaseGroup } from "./types/PathTestCaseType";

const LF = '\n';
const CRLF = '\r\n';

export const pathConvertTestGroups: Array<PathTestCaseGroup> = [
    {
        group: 'Normal Path Format Convert',
        testTitle: 'Normal Path Format Convert (常规路径风格转换)',
        cases: [
            {
                title: 'Windows 风格',
                input: // E:\Project\variable-conversion-vscode-extension
                    'E:\\Project\\variable-conversion-vscode-extension',
                eol: [LF, CRLF],
                output: {
                    Windows: {
                        unEscape: // E:\Project\variable-conversion-vscode-extension
                            'E:\\Project\\variable-conversion-vscode-extension',

                        escape: // E:\\Project\\variable-conversion-vscode-extension
                            'E:\\\\Project\\\\variable-conversion-vscode-extension',
                    },
                    Unix: {
                        unEscape:
                            'E:/Project/variable-conversion-vscode-extension',
                        escape: // E:\/Project\/variable-conversion-vscode-extension
                            'E:\\/Project\\/variable-conversion-vscode-extension',
                    },
                },
            },
            {
                title: 'Unix 风格',
                input: '/home/user/file.txt',
                eol: [LF, CRLF],
                output: {
                    Windows: {
                        unEscape: // \home\user\file.txt
                            '\\home\\user\\file.txt',
                        escape: // \\home\\user\\file.txt
                            '\\\\home\\\\user\\\\file.txt',
                    },
                    Unix: {
                        unEscape:
                            '/home/user/file.txt',
                        escape: // \/home\/user\/file.txt
                            '\\/home\\/user\\/file.txt',
                    },
                },
            },
            {
                title: 'Windows (Git Bash) 风格',
                input: '/c/Users/test/file.txt',
                eol: [LF, CRLF],
                output: {
                    Windows: {
                        unEscape: // \c\Users\test/file.txt
                            '\\c\\Users\\test\\file.txt',
                        escape:  // \\c\\Users\\test\\file.txt
                            '\\\\c\\\\Users\\\\test\\\\file.txt',
                        // TODO need to transform to ↓
                        /*
                        unEscape: // C:\Users\test\file.txt
                            'C:\\Users\\test\\file.txt',
                        escape:  // C:\\Users\\test\\file.txt
                            'C:\\\\Users\\\\test\\\\file.txt',
                        */
                    },
                    Unix: {
                        unEscape:
                            '/c/Users/test/file.txt',
                        escape: // \/c\/Users\/test\/file.txt
                            '\\/c\\/Users\\/test\\/file.txt',
                    },
                },
            },

            // TODO
            // Windows 局域网主机名风格
            // \\ComputerName
            // 路径带空格
            // /home/user/hello world.txt
            // /home/user/hello world.txt
            // and more ...

            // {
            //     title: '',
            //     input: //
            //         '',
            //     eol: [LF, CRLF],
            //     output: {
            //         Windows: {
            //             unEscape: //
            //                 '',
            //             escape:  //
            //                 '',
            //         },
            //         Unix: {
            //             unEscape: //
            //                 '',
            //             escape: //
            //                 '',
            //         },
            //     },
            // },
        ],
    },
];
