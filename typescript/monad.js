"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 响应结果处理 防止业务模块数据未判断出错
 */
class ResponseMonad {
    constructor(v) {
        this.isEmpty = (value = this.value) => {
            return value === '' || value === undefined || value === null;
        };
        this.map = (fn) => {
            if (this.isEmpty())
                return ResponseMonad.of({});
            try {
                return ResponseMonad.of(fn(this.value));
            }
            catch (e) {
                console.error(e);
                return ResponseMonad.of(e);
            }
        };
        /**
         * 数据平铺
         * @param defaultVale 提供默认值
         */
        this.join = () => {
            if (!(this.value instanceof ResponseMonad))
                return this.value;
            return this.value.join();
        };
        /**
         * 压平数据 不做LHS赋值
         * @param fn
         */
        this.chain = (fn) => {
            return fn(this.join());
        };
        /**
         * 平铺多data数据
         * @param defaultVale
         */
        this.joinData = (value = null) => {
            var _a;
            if (this.isEmpty(value === null || value === void 0 ? void 0 : value.data))
                return [];
            return ((_a = value === null || value === void 0 ? void 0 : value.data) === null || _a === void 0 ? void 0 : _a.data) || this.joinData((value === null || value === void 0 ? void 0 : value.data) || this.join());
        };
        this.value = v;
    }
}
exports.default = ResponseMonad;
ResponseMonad.of = function (v) {
    return new ResponseMonad(v);
};
console.log((ResponseMonad.of(ResponseMonad.of(ResponseMonad.of({
    states: 200,
    data: {
        code: '',
        data: null, message: ''
    },
    message: ''
})))).chain(_ => _.data));
// join打印
/**
 * {
 *	states: 200,
 *  data: { code: '', data: null, message: '' },
 *	message: ''
 *	}
 */
// joinData打印
/**
 * []
 */
// chain打印
/**
 * [] { code: '', data: null, message: '' }
 */ 
//# sourceMappingURL=monad.js.map