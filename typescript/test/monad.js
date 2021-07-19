"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const qunit_1 = require("qunit");
const monad_1 = require("../monad");
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
qunit_1.module('monad', {
    beforeEach: () => {
    },
    afterEach: () => {
    }
});
qunit_1.test('join', (assert) => {
    assert.notDeepEqual(_ => monad_1.default.of(monad_1.default.of(monad_1.default.of(mockResponse))).join(), mockResponse, '打印结果');
});
qunit_1.test('joinData', (assert) => {
    assert.notDeepEqual(_ => monad_1.default.of(monad_1.default.of(monad_1.default.of(mockResponse))).joinData(), [], '打印结果');
});
qunit_1.test('chain', (assert) => {
    assert.notDeepEqual(_ => monad_1.default.of(monad_1.default.of(monad_1.default.of(mockResponse))).chain(_ => _.data), mockResponse.data, '打印结果');
});
//# sourceMappingURL=monad.js.map