/**
 * 泛型约束
 */
interface DigitInterface<T> {
	(v: T): T;
}

/**
 * 保留几位小数
 */
export const currykeepMuchDecimal = (decimal: number) => {
	return <DigitInterface>(v: number) => {
		return Math.round(v * decimal) / decimal;
	}
};
/**
 * 将string类型转换成数字类型
 */
export const toNumber = (v: string): number => parseFloat(v);

/**
 * 计算倍数
 */
export const curryMultiple = (multiple: number) => {
	return <DigitInterface>(v: number) => {
		return v * multiple
	}
};
/**
 * compose 函数
 */
export const compose = (...fns: any) => {
	if (fns.length === 0) return (arg: any) => arg;
	if (fns.length === 1) return fns[0];
	/**
	 * 巧妙利用reduce的一直拼接特性 函数从右到左执行 右边的函数结果做完参数传递下去
	 * 返回一个无限包裹的函数(x)=> a(b(c(c(d(x)))))
	 */
	return fns.reduce((a: any, b: any) => (...args: any) => a(b(...args)))
};
/**
 * pie 函数
 * 和compose 执行顺序相反
 */
export const pipe = (...fns: any) => {
	if (fns.length === 0) return (arg: any) => arg;
	if (fns.length === 1) return fns[0];
	/**
	 * 巧妙利用reduce的一直拼接特性 从左到右执行
	 * 返回一个无限包裹的函数(x)=> d(c(b(a(x))))
	 */
	return fns.reduce((a: any, b: any) => (...args: any) => b(a(...args)))
};
/**
 * 字符串百分比转换
 */
export const strTransformPercentage = compose(currykeepMuchDecimal(100), curryMultiple(100), toNumber);
/**
 * num百分比转换
 */
export const numTransformPercentage = compose(currykeepMuchDecimal(100), curryMultiple(100));
