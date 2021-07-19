/**********************************************************************
 *
 * @模块名称: inertia
 *
 * @模块用途: 惰性计算函数
 *
 * @date: 2021/7/18 20:54
 *
 * @版权所有: pgli
 *
 **********************************************************************/

/**
 * 1、延迟到需要求值的时候求值
 * range 生成随机数组
 * take 获取其中的几个数据
 */
const range = (len: number): Array<number> => {
	return new Array<number>(len).fill(0).map(_ => Math.ceil(Math.random() * 100));
};

const take = (arr: Array<any>, len: number): Array<number> => {
	return new Array(len).fill(0).map((_, index) => arr[index]);
};

console.log(take(range(10), 3));

const getTreeRangeArrayFromTenInertia = (range, take) => {
	return (len: number) => {
		return take(range(len), len)
	}
};

getTreeRangeArrayFromTenInertia(range, take)(3);

/**
 * 2、惰性依赖，只需执行一次
 */
type EventFn = (eventType: string, el: Element, fn: () => any) => void
const addEvent = <EventFn>(type, el, fn) => {
	if (el.addEventListener) {
		el.addEventListener(type, fn, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + type, fn);
	} else {
		el['on' + type] = fn;
	}
};

let addEventInertia = <EventFn>(type, el, fn) => {
	if (el.addEventListener) {
		addEventInertia = <EventFn>(type, el, fn) => el.addEventListener(type, fn, false);
	} else if (el.attachEvent) {
		addEventInertia = <EventFn>(type, el, fn) => el.attachEvent('on' + type, fn);
	} else {
		addEventInertia = <EventFn>(type, el, fn) => el['on' + type] = fn;
	}
	return addEventInertia(type, el, fn);
};