/**********************************************************************
 *
 * @模块名称: scope
 *
 * @模块用途: scope
 *
 * @date: 2021/6/24 8:39
 *
 * @版权所有: PGLI
 *
 **********************************************************************/

function Foo() {
	getName = function () {
		alert(1);
	};
	return this;
}

Foo.getName = function () {
	alert(2);
};
Foo.prototype.getName = function () {
	alert(3);
};
var getName = function () {
	alert(4);
};

function getName() {
	alert(5);
}

// 输出结果
Foo.getName(); // 2 静态属性访问
getName(); // 4  变量提升 首先把var 提升到最上层，函数声明 紧随其后 随后执行到getName赋值 函数声明被覆盖
Foo().getName(); // 1 Foo()范围值 this 指向window 此处getName被从写 输出1
getName();// 1

new Foo.getName(); // 2
new Foo().getName(); // 3  (new Foo()).getName();
new new Foo().getName(); // 3  new ((new Foo()).getName)();