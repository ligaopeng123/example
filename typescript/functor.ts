/**
 * 不能使用箭头函数
 * 箭头函数没有constructor和prototype
 * @constructor
 */
interface Functor<T> {
	(arg: T): T,
	
	of: any,
	prototype: object,
	isNothing?: (arg: T) => boolean
}


// 创建一个容器
const Functor = function <Functor>(val) {
	this.value = val;
};
// 添加of接口，省略new去创建
Functor.of = function (val) {
	// @ts-ignore
	return new Functor(val);
};
// 实现map接口
Functor.prototype.map = function (fn) {
	return Functor.of(fn(this.value));
};

const v = Functor.of(2);
const t = Functor.of({a: 1});
const r = Functor.of([1, 2]);

console.log(v, t, r);
// Functor { value: 2 } Functor { value: { a: 1 } } Functor { value: [ 1, 2 ] }
console.log(v.map((x) => {
	return x * x
}).map((x) => {
	return x + x;
}));
// Functor { value: 8 }
/**
 * MayBe函子
 * @param val
 * @constructor
 */
Functor.prototype.isNothing = function () {
	return this.value !== undefined && this.value !== null;
};
/**
 * 重写map函数
 * @param fn
 */
Functor.prototype.map = function (fn) {
	return this.isNothing() ? Functor.of(null) : Functor.of(fn(this.value));
};

// 测试代码
const n = Functor.of(null).map((v)=> {
	return v * 1;
}).map((v)=> {
	return v;
});
console.log(n); // Functor { value: null }
