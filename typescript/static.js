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
var StaticClass = /** @class */ (function () {
    function StaticClass() {
        var _this = this;
        this.name = 'test';
        this.getName = function () {
            return _this.name;
        };
    }
    StaticClass.age = 4;
    StaticClass.getAge = function () {
        return StaticClass.age;
    };
    return StaticClass;
}());
exports.default = StaticClass;
