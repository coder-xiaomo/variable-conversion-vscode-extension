import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import testGroups from './test-case';
import { TestCase, TestCaseGroup } from '../type-definition/TestCaseType';
import { transformMutliLineText, transformText } from '../main-code/transform';
import { caseConversion } from '../main-code/conversion';
import { SupportCase } from '../type-definition/SupportCaseType';
import { TransformTextResult } from '../type-definition/TransformTextResultType';
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

suite('Extension Test: run test case', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const groups: Array<TestCaseGroup> = testGroups;
	for (const testGroup of groups) {
		const testTitle = testGroup.testTitle;
		const testCases: Array<TestCase> = testGroup.cases;
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
						assert.strictEqual(testCase.output.camelCase, caseConversion(SupportCase.CAMEL_CASE, input, eol));
						assert.strictEqual(testCase.output.pascalCase, caseConversion(SupportCase.PASCAL_CASE, input, eol));

						assert.strictEqual(testCase.output.snakeCase, caseConversion(SupportCase.SNAKE_CASE, input, eol));
						assert.strictEqual(testCase.output.snakeCamelCase, caseConversion(SupportCase.SNAKE_CAMEL_CASE, input, eol));
						assert.strictEqual(testCase.output.snakePascalCase, caseConversion(SupportCase.SNAKE_PASCAL_CASE, input, eol));
						assert.strictEqual(testCase.output.snakeUpperCase, caseConversion(SupportCase.SNAKE_UPPER_CASE, input, eol));

						assert.strictEqual(testCase.output.kebabCase, caseConversion(SupportCase.KEBAB_CASE, input, eol));
						assert.strictEqual(testCase.output.kebabCamelCase, caseConversion(SupportCase.KEBAB_CAMEL_CASE, input, eol));
						assert.strictEqual(testCase.output.kebabPascalCase, caseConversion(SupportCase.KEBAB_PASCAL_CASE, input, eol));
						assert.strictEqual(testCase.output.kebabUpperCase, caseConversion(SupportCase.KEBAB_UPPER_CASE, input, eol));
						
						assert.strictEqual(testCase.output.spaceCase, caseConversion(SupportCase.SPACE_CASE, input, eol));
						assert.strictEqual(testCase.output.spaceCamelCase, caseConversion(SupportCase.SPACE_CAMEL_CASE, input, eol));
						assert.strictEqual(testCase.output.spacePascalCase, caseConversion(SupportCase.SPACE_PASCAL_CASE, input, eol));
						assert.strictEqual(testCase.output.spaceUpperCase, caseConversion(SupportCase.SPACE_UPPER_CASE, input, eol));
						
						if (testCase.output.lowerCase !== undefined) {
							assert.strictEqual(testCase.output.lowerCase, caseConversion(SupportCase.LOWER_CASE, input, eol));
						}
						if (testCase.output.upperCase !== undefined) {
							assert.strictEqual(testCase.output.upperCase, caseConversion(SupportCase.UPPER_CASE, input, eol));
						}
					}
				}
			});
		}
	}
});
