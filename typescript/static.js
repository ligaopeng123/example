"use strict";
/**********************************************************************
 *
 * @模块名称: static
 *
 * @模块用途: static
 *
 * @date: 2021/6/24 13:34
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
class StaticClass {
    constructor() {
        this.name = 'test';
        this.getName = () => {
            return this.name;
        };
    }
}
StaticClass.age = 4;
StaticClass.getAge = () => {
    return StaticClass.age;
};
exports.default = StaticClass;
//# sourceMappingURL=static.js.map