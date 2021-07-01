/**
 * 偏应用函数
 */
import {compose} from "./compose";

interface fnType<T> {
	(arg: T): T;
}

const partial = <fnType>(fn, ...args) => {
	return (...args2) => {
		let current = 0;
		for (let i = 0; i < args.length && current < args2.length; i++) {
			// 如果参数中有undefined 则使用后面传入的参数做替换
			if (args[i] === undefined) args[i] = args2[current++];
		}
		return fn(...args);
	}
};

const afterTenSeconds = partial(setTimeout, undefined, 10);

afterTenSeconds(() => {
	console.log(`10秒后打印`)
});
// 将json数据 格式化打印出来
const consoleJsonStr = partial(JSON.stringify, undefined, null, 2);
const consoleJson = compose(console.log, consoleJsonStr);

consoleJson({test: 1, t: 2});