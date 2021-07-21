/**********************************************************************
 *
 * @模块名称: CPS
 *
 * @模块用途: CPS
 *
 * @date: 2021/7/20 21:08
 *
 * @版权所有: pgli
 *
 **********************************************************************/
type Fn = (...args: Array<number>) => number
const addFn: Fn = (x, y) => x + y;
const square: Fn = (z) => z * z;
// 一般写法
square(addFn(2, 3));
// Continuation-passing style
const cps = (x, y, square) => square(x + y);

/**
 * 普通递归
 * @param num
 * @returns {*}
 */
export const cps1 = (num) => {
	if (num < 1) return num;
	return num + cps1(num - 1);
};
/**
 * cps 尾递归
 * @param num
 * @returns {*}
 */
export const cps2 = (num, sum = 1) => {
	if (num < 1) return sum;
	// cps2就是个cps风格代码
	return cps2(num - 1, sum + num);
};

/**
 * 递归转迭代
 * @constructor
 */
const Iteration = (fn) => {
	let v = 0;
	// 状态管理 返回undefined 避免产生调用帧
	let active = false;
	const args = [];
	const f = (...args2) => {
		args.push(args2);
		if (!active) {
			active = true;
			while (args.length) {
				v = fn(...args.shift());
			}
			active = false;
			return v;
		}
	};
	return f;
};

/**
 * 迭代
 * @type {f}
 */
export const cps3 = Iteration((num, sum) => {
	if (num < 1) return sum;
	return cps3(num - 1, sum + num);
});
/**
 * chrome测试
 */
// console.log(cps1(10466))
// console.log(cps2(8373))
// console.log(cps3(20000, 1))
