/**
 * 响应结果处理 防止业务模块数据未判断出错
 */
export class ResponseMonad {
	value: any;
	
	constructor(v: any) {
		this.value = v;
	}
	
	static of = function (v: any) {
		return new ResponseMonad(v);
	};
	isEmpty = () => {
		return this.value === '' || this.value === undefined || this.value === null;
	};
	/**
	 * 数据平铺
	 * @param defaultVale 提供默认值
	 */
	join = (defaultVale?: any): any => {
		return this.isEmpty() ? ResponseMonad.of(defaultVale || {}).join(defaultVale) : this.value
	};
	/**
	 * 平铺多data数据
	 * @param defaultVale
	 */
	joinData = (data?: object): any => {
		const _data = data || this.value;
		return _data.data ? this.joinData(ResponseMonad.of(_data.data).join()) : _data;
	};
	map = (fn: <T>(...p: any) => any) => {
		if (this.isEmpty()) return ResponseMonad.of({});
		try {
			return ResponseMonad.of(fn(this.value));
		} catch (e) {
			console.error(e);
			return ResponseMonad.of(e);
		}
	}
}
