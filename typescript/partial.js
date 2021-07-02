"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 偏应用函数
 */
var compose_1 = require("./compose");
var partial = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args2[_i] = arguments[_i];
        }
        var current = 0;
        for (var i = 0; i < args.length && current < args2.length; i++) {
            // 如果参数中有undefined 则使用后面传入的参数做替换
            if (args[i] === undefined)
                args[i] = args2[current++];
        }
        return fn.apply(void 0, args);
    };
};
var afterTenSeconds = partial(setTimeout, undefined, 10);
afterTenSeconds(function () {
    console.log("10\u79D2\u540E\u6253\u5370");
});
// 将json数据 格式化打印出来
var consoleJsonStr = partial(JSON.stringify, undefined, null, 2);
var consoleJson = compose_1.compose(console.log, consoleJsonStr);
consoleJson({ test: 1, t: 2 });
