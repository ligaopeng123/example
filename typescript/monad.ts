/**
 * 响应结果处理 防止业务模块数据未判断出错
 */
export default class ResponseMonad {
	value: any;
	
	constructor(v: any) {
		this.value = v;
	}
	
	static of = function (v: any) {
		return new ResponseMonad(v);
	};
	isEmpty = (value = this.value) => {
		return value === '' || value === undefined || value === null;
	};
	
	map = (fn: <T>(...p: any) => any) => {
		if (this.isEmpty()) return ResponseMonad.of({});
		try {
			return ResponseMonad.of(fn(this.value));
		} catch (e) {
			console.error(e);
			return ResponseMonad.of(e);
		}
	};
	
	/**
	 * 数据平铺
	 * @param defaultVale 提供默认值
	 */
	join = () => {
		if (!(this.value instanceof ResponseMonad)) return this.value;
		return this.value.join();
	};
	/**
	 * 压平数据 不做LHS赋值
	 * @param fn
	 */
	chain = (fn) => {
		return fn(this.join())
	};
	
	/**
	 * 平铺多data数据
	 * @param defaultVale
	 */
	joinData = (value: any = null): any => {
		if (this.isEmpty(value?.data)) return [];
		return value?.data?.data || this.joinData(value?.data || this.join());
	};
}

console.log((ResponseMonad.of(
	ResponseMonad.of(
		ResponseMonad.of({
			states: 200,
			data: {
				code: '',
				data: null, message: ''
			},
			message: ''
		})
	)
)).chain(_ => _.data));
// join打印
/**
 * {
 *	states: 200,
 *  data: { code: '', data: null, message: '' },
 *	message: ''
 *	}
 */

// joinData打印
/**
 * []
 */

// chain打印
/**
 * [] { code: '', data: null, message: '' }
 */