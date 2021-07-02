"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numTransformPercentage = exports.strTransformPercentage = exports.pipe = exports.compose = exports.curryMultiple = exports.toNumber = exports.currykeepMuchDecimal = void 0;
/**
 * 保留几位小数
 */
var currykeepMuchDecimal = function (decimal) {
    return function (v) {
        return Math.round(v * decimal) / decimal;
    };
};
exports.currykeepMuchDecimal = currykeepMuchDecimal;
/**
 * 将string类型转换成数字类型
 */
var toNumber = function (v) { return parseFloat(v); };
exports.toNumber = toNumber;
/**
 * 计算倍数
 */
var curryMultiple = function (multiple) {
    return function (v) {
        return v * multiple;
    };
};
exports.curryMultiple = curryMultiple;
/**
 * compose 函数
 */
var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    if (fns.length === 0)
        return function (arg) { return arg; };
    if (fns.length === 1)
        return fns[0];
    /**
     * 巧妙利用reduce的一直拼接特性 函数从右到左执行 右边的函数结果做完参数传递下去
     * 返回一个无限包裹的函数(x)=> a(b(c(c(d(x)))))
     */
    return fns.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return a(b.apply(void 0, args));
    }; });
};
exports.compose = compose;
/**
 * pie 函数
 * 和compose 执行顺序相反
 */
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    if (fns.length === 0)
        return function (arg) { return arg; };
    if (fns.length === 1)
        return fns[0];
    /**
     * 巧妙利用reduce的一直拼接特性 从左到右执行
     * 返回一个无限包裹的函数(x)=> d(c(b(a(x))))
     */
    return fns.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return b(a.apply(void 0, args));
    }; });
};
exports.pipe = pipe;
/**
 * 字符串百分比转换
 */
exports.strTransformPercentage = exports.compose(exports.currykeepMuchDecimal(100), exports.curryMultiple(100), exports.toNumber);
/**
 * num百分比转换
 */
exports.numTransformPercentage = exports.compose(exports.currykeepMuchDecimal(100), exports.curryMultiple(100));
