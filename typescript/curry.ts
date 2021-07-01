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
type curryParams = (...args: Array<any>) => any;

interface Curry<T> {
	(arg: T): curryParams;
}

const curry = <Curry>(fn: curryParams) => {
	if (typeof fn !== 'function') {
		throw new Error(`${fn} is not a function`);
	}
	/**
	 * 拼接参数
	 * @private
	 */
	const g = <Curry>(...args1) => {
		// 当g函数调用传递参数比fn本身参数少 则直接执行fn 并将结果返回
		if (args1.length >= fn.length) return fn(...args1);
		// 当g函数调用传递参数比fn本身参数多 则需要拼接缓存参数
		return <Curry>(...args2) => {
			return g(...args1, ...args2);
		}
	};
	return g;
};


const add = (a: number, b: number) => {
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
const CurrieFn = <Curry>(fn: curryParams, initialValue: any) => {
	let sum = initialValue;
	/**
	 * 定义一个函数，抛出去供下次传参调用
	 */
	const temp = <Curry>(x) => {
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
	return temp
};
const addNum = CurrieFn(add, 0)(1)(2)(3)(4);
console.log(addNum);
const MultiplyNum = CurrieFn(multiply, 1)(1)(2)(3)(4);
console.log(MultiplyNum);

// defaultValue 默认值
// 使用数组方便命名结构
const [value,setValue] = useState(defaultValue);
// 初始化执行后 value的值 只能通过setValue改变 通过传递props是无法改变的
// value如果是父组件传递进来的化 只在初次渲染会复制 后续触发的更新不能修改value值
// 也就是说value值只能通过setValue修改 父组件改变props.value触发的更新不会更新value值
const [value,setValue] = useState(props.value);
