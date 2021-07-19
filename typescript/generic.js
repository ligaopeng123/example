/**
 * 泛型类型
 * @param arg
 */
const varFn = (arg) => {
    return arg;
};
const gVarFn = (arg) => {
    return arg;
};
const gInterfaceFn = (t) => {
    return t;
};
/**
 * 泛型类
 */
class Person {
}
const person = new Person();
person.setInfo = (age, name) => {
};
person.add = (x, y) => x;
person.getName = () => person.name;
const fn = (x) => x.length;
/**
 * 类类型
 */
const create = (c) => {
    return new c();
};
// 类类型推导
class Animal {
}
class Jump {
}
class Run {
}
class Dog extends Animal {
}
class Cat extends Animal {
}
const getSkill = (c) => {
    return new c();
};
getSkill(Cat).skill.canJump();
getSkill(Cat).name;
getSkill(Dog).skill.canRun();
//# sourceMappingURL=generic.js.map