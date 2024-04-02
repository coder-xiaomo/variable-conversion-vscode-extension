import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import testGroups from './test-case';
import { TestCase, TestCaseGroup } from '../type-definition/test-case-type';
import { transformText } from '../main-code/text-transform';
import { toCamelCase, toPascalCase } from '../main-code/text-conversion';
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
			test(testTitle + ' - ' + testCase.title, () => {
				const inputList = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
				for (const input of inputList) {
					// 验证 transformText
					assert.strictEqual(testCase.transformText, transformText(input));
					// 验证转换
					assert.strictEqual(testCase.output.camelCase, toCamelCase(input));
					assert.strictEqual(testCase.output.pascalCase, toPascalCase(input));
				}
			});
		}
	}
});
