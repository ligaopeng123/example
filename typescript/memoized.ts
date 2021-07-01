/**********************************************************************
 *
 * @模块名称: memoized
 *
 * @模块用途: memoized
 *
 * @date: 2021/7/1 12:39
 *
 * @版权所有: pgli
 *
 **********************************************************************/
interface fnType<T> {
	(arg: T): T;
}
const memoized = <fnType>(fn: (arg) => any) => {
	// 缓存求值 如果有则取缓存 如果没有则赋值
	const cache: object = {};
	return (arg) => {
		return cache[arg] || (cache[arg] = fn(arg));
	};
};

const square = <fnType>(n) => {
	if (!n) return 1;
	return n * square(--n)
};

const memoizedSquare = memoized(square);

memoizedSquare(5);


