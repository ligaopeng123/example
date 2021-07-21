/**********************************************************************
 *
 * @模块名称: IOMonad
 *
 * @模块用途: IOMonad
 *
 * @date: 2021/7/19 14:10
 *
 * @版权所有: pgli
 *
 **********************************************************************/
/**
 * 读取localStorage数据，将其绘制到dom结构体上，代码如下
 */
function getUserData() {
	return localStorage.getItem('userInfo');
}
function writeDom(text) {
	document.body.innerHTML = text;
}
function setUser() {
	// 副作用 无法保证userData的值是否合法
	const userData = getUserData();
	const userInfo = JSON.parse(userData);
	const username = userInfo.username;
	writeDom(username );
}
/**
 * 处理dom操作 保证操作的纯粹
 */
export default class IOMonad {
	effect = null;
	
	constructor(effect) {
		if (typeof effect !== 'function') {
			throw `${effect} not a function!`
		}
		this.effect = effect;
	}
	
	static of(v) {
		return new IOMonad(() => v);
	}
	
	static form(fn) {
		return new IOMonad(fn);
	}
	
	/**
	 * 将副作用函数转换
	 * @param fn
	 * @returns {IOMonad}
	 */
	map(fn) {
		return new IOMonad(() => {
			try {
				return fn(this.effect())
			} catch (e) {
				console.error(e);
			}
		})
	}
	
	/**
	 * 将数据平铺
	 * @param fn
	 * @returns {*}
	 */
	chain(fn) {
		return fn(this.effect());
	}
	
	/**
	 * 执行副作用函数
	 */
	run() {
		return this.effect();
	}
	
	/**
	 * 执行副作用
	 * @param fn
	 */
	fork(fn) {
		fn && typeof fn == 'function' && fn(this.run());
	}
};

// 包裹函数，此处没有触发执行时机，函数不会执行
const writeUsername = IOMonad.form(getUserData).map(JSON.parse).map(x => x.username);
console.log(1); // 正常打印
// 触发函数执行，开始执行包裹的函数
writeUsername.fork(writeDom);
console.log(2); // 正常打印 即使有错误
