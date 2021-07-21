/**********************************************************************
 *
 * @模块名称: monad
 *
 * @模块用途: 测试monad
 *
 * @date: 2021/7/19 13:24
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {module, test} from 'qunit';
import ResponseMonad from "../monad";

/**
 * mock数据
 */
const mockResponse = {
	states: 200,
	data: {
		code: '',
		data: null,
		message: ''
	},
	message: ''
};

/**
 * 创建上下文
 */
module('monad', {
	beforeEach: () => {
	},
	afterEach: () => {
	}
});

test('join', (assert) => {
	assert.notDeepEqual(_ => ResponseMonad.of(
		ResponseMonad.of(
			ResponseMonad.of(
				mockResponse
			)
		)
	).join(), mockResponse, '打印结果')
});

test('joinData', (assert) => {
	assert.notDeepEqual(_ => ResponseMonad.of(
		ResponseMonad.of(
			ResponseMonad.of(
				mockResponse
			)
		)
	).joinData(), [], '打印结果')
});

test('chain', (assert) => {
	assert.notDeepEqual(_ => ResponseMonad.of(
		ResponseMonad.of(
			ResponseMonad.of(
				mockResponse
			)
		)
	).chain(_ => _.data), mockResponse.data, '打印结果')
});
