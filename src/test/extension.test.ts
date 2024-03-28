import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

enum TextFormat {
	/** 独立单词 */
	SINGLE_WORD,
	/** 小驼峰 */
	CAMEL_CASE,
	/** 大驼峰 */
	PASCAL_CASE,
	/** 大写 */
	UPPER_CASE,
	/** 小写 */
	LOWER_CASE,
}

interface TestCase {
	input: string
	inputType: TextFormat | Array<TextFormat>
	output: {
		camelCase: string
	}
}
const testCase: Array<TestCase> = [
	{
		input: '',
		inputType: [],
		output: {
			camelCase: '',
		}
	},
];

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
