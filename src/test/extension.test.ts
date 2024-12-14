import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { variableConvertTestGroups } from './test-case/variable-convert-test-case';
import { pathConvertTestGroups } from './test-case/path-convert-test-case';
import { VariableTestCase, VariableTestCaseGroup } from './test-case/types/VariableTestCaseType';
import { PathTestCase, PathTestCaseGroup } from './test-case/types/PathTestCaseType';
import { transformMutliLineText, transformText } from '../utils/transform';
import { caseConversion } from '../core/variable-convert/conversion';
import { pathConversion } from '../core/path-convert/conversion';
import { SupportVariableCase } from '../core/variable-convert/types/SupportVariableCaseType';
import { SupportPathFormat } from '../core/path-convert/types/SupportPathFormatType';
import { TransformTextResult } from '../types/TransformTextResultType';
// import * as myExtension from '../../extension';

/*
suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
 */

/**
 * 变量转换 测试函数
 *
 * @since 2024-04-02
 */
suite('Extension Test: run variable convert test case', () => {
	vscode.window.showInformationMessage('Start all tests for variable conversion.');

	const groups: Array<VariableTestCaseGroup> = variableConvertTestGroups;
	for (const testGroup of groups) {
		const testTitle = testGroup.testTitle;
		const testCases: Array<VariableTestCase> = testGroup.cases;
		for (const testCase of testCases) {
			// // 临时
			// if (testCase.title !== '') {
			// 	continue;
			// }
			test(testTitle + ' - ' + testCase.title, () => {
				const inputList = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
				const eolList = Array.isArray(testCase.eol) ? testCase.eol : [testCase.eol];
				for (const input of inputList) {
					// console.log('input', '->' + input + '<-');
					// 验证 transformText
					const transformTextResult: Array<TransformTextResult> = transformMutliLineText(input);
					const results = transformTextResult.map(res => res.result);
					for (let index = 0; index < testCase.transformText.length; index++) {
						const correctValue = testCase.transformText[index];
						const currentValue = results[index];
						assert.strictEqual(correctValue, currentValue);
					}
					// 验证转换
					for (let eol of eolList) {
						assert.strictEqual(testCase.output.camelCase, caseConversion(SupportVariableCase.CAMEL_CASE, input, eol), 'camel case test failed.');
						assert.strictEqual(testCase.output.pascalCase, caseConversion(SupportVariableCase.PASCAL_CASE, input, eol), 'pascal case test failed.');

						assert.strictEqual(testCase.output.snakeCase, caseConversion(SupportVariableCase.SNAKE_CASE, input, eol), 'snake case test failed.');
						assert.strictEqual(testCase.output.snakeCamelCase, caseConversion(SupportVariableCase.SNAKE_CAMEL_CASE, input, eol), 'snake camel case test failed.');
						assert.strictEqual(testCase.output.snakePascalCase, caseConversion(SupportVariableCase.SNAKE_PASCAL_CASE, input, eol), 'snake pascal case test failed.');
						assert.strictEqual(testCase.output.snakeUpperCase, caseConversion(SupportVariableCase.SNAKE_UPPER_CASE, input, eol), 'snake upper case test failed.');

						assert.strictEqual(testCase.output.kebabCase, caseConversion(SupportVariableCase.KEBAB_CASE, input, eol), 'kebab case test failed.');
						assert.strictEqual(testCase.output.kebabCamelCase, caseConversion(SupportVariableCase.KEBAB_CAMEL_CASE, input, eol), 'kebab camel case test failed.');
						assert.strictEqual(testCase.output.kebabPascalCase, caseConversion(SupportVariableCase.KEBAB_PASCAL_CASE, input, eol), 'kebab pascal case test failed.');
						assert.strictEqual(testCase.output.kebabUpperCase, caseConversion(SupportVariableCase.KEBAB_UPPER_CASE, input, eol), 'kebab upper case test failed.');

						assert.strictEqual(testCase.output.spaceCase, caseConversion(SupportVariableCase.SPACE_CASE, input, eol), 'space case test failed.');
						assert.strictEqual(testCase.output.spaceCamelCase, caseConversion(SupportVariableCase.SPACE_CAMEL_CASE, input, eol), 'space camel case test failed.');
						assert.strictEqual(testCase.output.spacePascalCase, caseConversion(SupportVariableCase.SPACE_PASCAL_CASE, input, eol), 'space pascal case test failed.');
						assert.strictEqual(testCase.output.spaceUpperCase, caseConversion(SupportVariableCase.SPACE_UPPER_CASE, input, eol), 'space upper case test failed.');

						assert.strictEqual(testCase.output.dotCase, caseConversion(SupportVariableCase.DOT_CASE, input, eol), 'dot case test failed.');
						assert.strictEqual(testCase.output.dotCamelCase, caseConversion(SupportVariableCase.DOT_CAMEL_CASE, input, eol), 'dot camel case test failed.');
						assert.strictEqual(testCase.output.dotPascalCase, caseConversion(SupportVariableCase.DOT_PASCAL_CASE, input, eol), 'dot pascal case test failed.');
						assert.strictEqual(testCase.output.dotUpperCase, caseConversion(SupportVariableCase.DOT_UPPER_CASE, input, eol), 'dot upper case test failed.');

						if (testCase.output.lowerCase !== undefined) {
							assert.strictEqual(testCase.output.lowerCase, caseConversion(SupportVariableCase.LOWER_CASE, input, eol), 'lower case test failed.');
						}
						if (testCase.output.upperCase !== undefined) {
							assert.strictEqual(testCase.output.upperCase, caseConversion(SupportVariableCase.UPPER_CASE, input, eol), 'upper case test failed.');
						}
					}
				}
			});
		}
	}
});

/**
 * 路径转换 测试函数
 *
 * @since 2024-12-07
 */
suite('Extension Test: run path convert test case', () => {
	vscode.window.showInformationMessage('Start all tests for path conversion.');

	const groups: Array<PathTestCaseGroup> = pathConvertTestGroups;
	for (const testGroup of groups) {
		const testTitle = testGroup.testTitle;
		const testCases: Array<PathTestCase> = testGroup.cases;
		for (const testCase of testCases) {
			// // 临时
			// if (testCase.title !== '') {
			// 	continue;
			// }
			test(testTitle + ' - ' + testCase.title, () => {
				const inputList = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
				for (const input of inputList) {
					// console.log('input', '->' + input + '<-');
					// 验证转换
					assert.strictEqual(testCase.output.Windows.unEscape, pathConversion(SupportPathFormat.Windows, input), 'Windows path format test failed.');
					assert.strictEqual(testCase.output.Unix.unEscape, pathConversion(SupportPathFormat.Unix, input), 'Unix path format test failed.');
				}
			});
		}
	}
});
