/**********************************************************************
 *
 * @模块名称: curry
 *
 * @模块用途: curry
 *
 * @date: 2021/6/29 8:29
 *
 * @版权所有: pgli
 *
 **********************************************************************/
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// 闭包函数 需要一个函数作为入参 并返回一个函数
function curryN(fn) {
    return function (fristArg) {
        return function (secondArg) {
            return fn(fristArg, secondArg);
        };
    };
}
var sum = function (x, y) {
    return x + y;
};
var sum2 = curryN(sum);
sum2(1)(2);
var curry = function (fn) {
    if (typeof fn !== 'function') {
        throw new Error(fn + " is not a function");
    }
    /**
     * 拼接参数
     * @private
     */
    var g = function () {
        var args1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args1[_i] = arguments[_i];
        }
        // 当g函数调用传递参数比fn本身参数少 则直接执行fn 并将结果返回
        if (args1.length >= fn.length)
            return fn.apply(void 0, args1);
        // 当g函数调用传递参数比fn本身参数多 则需要拼接缓存参数
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return g.apply(void 0, __spreadArray(__spreadArray([], args1), args2));
        };
    };
    return g;
};
var add = function (a, b) {
    return a + b;
};
console.log(curry(add)(1)(2));
/**
 *  相乘测试
 * @constructor
 */
var multiply = function (x, y) {
    return x * y;
};
/**
 * 参考柯里概念
 * @param add  必须是一个函数
 * @returns {temp}
 */
var CurrieFn = function (fn, initialValue) {
    var sum = initialValue;
    /**
     * 定义一个函数，抛出去供下次传参调用
     */
    var temp = function (x) {
        sum = fn(sum, x);
        return temp;
    };
    /**
     * 重写toString和valueOf方法
     * 在参与计算、比较等涉及需要类型转换的时候（打印也会） 会调用toString或valueOf函数 输出结果
     */
    temp.toString = temp.valueOf = function () {
        return sum;
    };
    return temp;
};
var addNum = CurrieFn(add, 0)(1)(2)(3)(4);
console.log(addNum);
var MultiplyNum = CurrieFn(multiply, 1)(1)(2)(3)(4);
console.log(MultiplyNum);
