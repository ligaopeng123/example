/**
 * 泛型类型
 * @param arg
 */
const varFn = (arg) => {
	return arg;
};

const gVarFn = <T>(arg: T): T => {
	return arg;
};

/**
 * 泛型接口
 */
interface fnT<T> {
	(arg: T): T;
}

const gInterfaceFn: fnT<string> = (t: string): string => {
	return t
};

/**
 * 泛型类
 */
class Person<T, K> {
	name: string;
	age: number;
	setInfo: (age: T, name: K) => void;
	getName: () => T;
	add: (x: T, y: K) => T
}

const person = new Person();
person.setInfo = (age, name) => {
};
person.add = (x, y) => x;

person.getName = () => this.name;


/**
 * 泛型约束
 */
interface LengthInterface {
	length: number
}

const fn = <T extends LengthInterface>(x: T) => x.length;


/**
 * 类类型
 */
const create = <T>(c: { new(): T; }): T => {
	return new c();
};

// 类类型推导
class Animal {
	name: string;
}

class Jump {
	canJump: <T>() => boolean;
}

class Run {
	canRun: <T>() => boolean;
}

class Dog extends Animal {
	skill: Run;
}

class Cat extends Animal {
	skill: Jump;
}

const getSkill = <T extends Animal>(c: new () => T): T => {
	return new c();
};

getSkill(Cat).skill.canJump();
getSkill(Cat).name;
getSkill(Dog).skill.canRun();

