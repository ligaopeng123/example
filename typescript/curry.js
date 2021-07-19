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
// 闭包函数 需要一个函数作为入参 并返回一个函数
function curryN(fn) {
    return (fristArg) => {
        return (secondArg) => {
            return fn(fristArg, secondArg);
        };
    };
}
const sum = (x, y) => {
    return x + y;
};
const sum2 = curryN(sum);
sum2(1)(2);
const curry = (fn) => {
    if (typeof fn !== 'function') {
        throw new Error(`${fn} is not a function`);
    }
    /**
     * 拼接参数
     * @private
     */
    const g = (...args1) => {
        // 当g函数调用传递参数比fn本身参数少 则直接执行fn 并将结果返回
        if (args1.length >= fn.length)
            return fn(...args1);
        // 当g函数调用传递参数比fn本身参数多 则需要拼接缓存参数
        return (...args2) => {
            return g(...args1, ...args2);
        };
    };
    return g;
};
const add = (a, b) => {
    return a + b;
};
console.log(curry(add)(1)(2));
/**
 *  相乘测试
 * @constructor
 */
const multiply = function (x, y) {
    return x * y;
};
/**
 * 参考柯里概念
 * @param add  必须是一个函数
 * @returns {temp}
 */
const CurrieFn = (fn, initialValue) => {
    let sum = initialValue;
    /**
     * 定义一个函数，抛出去供下次传参调用
     */
    const temp = (x) => {
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
const addNum = CurrieFn(add, 0)(1)(2)(3)(4);
console.log(addNum);
const MultiplyNum = CurrieFn(multiply, 1)(1)(2)(3)(4);
console.log(MultiplyNum);
//# sourceMappingURL=curry.js.map