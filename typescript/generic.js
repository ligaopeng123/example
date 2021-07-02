var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 泛型类型
 * @param arg
 */
var varFn = function (arg) {
    return arg;
};
var gVarFn = function (arg) {
    return arg;
};
var gInterfaceFn = function (t) {
    return t;
};
/**
 * 泛型类
 */
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var person = new Person();
person.setInfo = function (age, name) {
};
person.add = function (x, y) { return x; };
person.getName = function () { return person.name; };
var fn = function (x) { return x.length; };
/**
 * 类类型
 */
var create = function (c) {
    return new c();
};
// 类类型推导
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Jump = /** @class */ (function () {
    function Jump() {
    }
    return Jump;
}());
var Run = /** @class */ (function () {
    function Run() {
    }
    return Run;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cat;
}(Animal));
var getSkill = function (c) {
    return new c();
};
getSkill(Cat).skill.canJump();
getSkill(Cat).name;
getSkill(Dog).skill.canRun();
