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
/**
 * 缓存函数
 * @param fn
 */
interface Cache {
	[propName: string]: any
}

interface FN {
	(arg: number | string): any
}

export const memoized = (fn: FN) => {
	// 缓存求值 如果有则取缓存 如果没有则赋值
	const cache: Cache = {};
	return function memoiz<FN>(arg: number | string): any {
		return cache[arg] || (cache[arg] = fn(arg));
	};
};


const square: FN = (n: number) => {
	if (!n) return 1;
	return n * square(--n)
};

const memoizedSquare = memoized(square);

memoizedSquare(5);


/**
 * 异步缓存求值
 * @param fn
 */
interface AsyncFN {
	(arg: string): Promise<any>
}

export const asyncMemoized = (fn: AsyncFN) => {
	// 缓存求值 如果有则取缓存 如果没有则赋值
	const cache: Cache = {};
	return async function memoiz<fnType>(arg: string): Promise<any> {
		cache[arg] || (cache[arg] = await fn(arg));
		return [cache[arg], cache];
	};
};

const getData: AsyncFN = async () => {
	return await fetch('***')
};
const asyncMemoizedGetData = asyncMemoized(getData);
