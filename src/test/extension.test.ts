import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import testGroups from './test-case';
import { TestCase, TestCaseGroup } from '../type-definition/test-case-type';
import { transformMutliLineText, transformText } from '../main-code/variable-transform';
import { toCamelCase, toLowerCase, toPascalCase, toUpperCase } from '../main-code/variable-conversion';
import { TransformTextResult } from '../type-definition/variable-transform-type';
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

	// transform to camel case


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
						assert.strictEqual(testCase.output.camelCase, toCamelCase(input, eol));
						assert.strictEqual(testCase.output.pascalCase, toPascalCase(input, eol));
						if (testCase.output.upperCase !== undefined) {
							assert.strictEqual(testCase.output.upperCase, toUpperCase(input, eol));
						}
						if (testCase.output.lowerCase !== undefined) {
							assert.strictEqual(testCase.output.lowerCase, toLowerCase(input, eol));
						}
					}
				}
			});
		}
	}
});
