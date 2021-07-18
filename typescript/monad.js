"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMonad = void 0;
/**
 * 响应结果处理 防止业务模块数据未判断出错
 */
var ResponseMonad = /** @class */ (function () {
    function ResponseMonad(v) {
        var _this = this;
        this.isEmpty = function () {
            return _this.value === '' || _this.value === undefined || _this.value === null;
        };
        /**
         * 数据平铺
         * @param defaultVale 提供默认值
         */
        this.join = function (defaultVale) {
            return _this.isEmpty() ? ResponseMonad.of(defaultVale || {}).join(defaultVale) : _this.value;
        };
        /**
         * 平铺多data数据
         * @param defaultVale
         */
        this.joinData = function (data) {
            var _data = data || _this.value;
            return _data.data ? _this.joinData(ResponseMonad.of(_data.data).join()) : _data;
        };
        this.map = function (fn) {
            if (_this.isEmpty())
                return ResponseMonad.of({});
            try {
                return ResponseMonad.of(fn(_this.value));
            }
            catch (e) {
                console.error(e);
                return ResponseMonad.of(e);
            }
        };
        this.value = v;
    }
    ResponseMonad.of = function (v) {
        return new ResponseMonad(v);
    };
    return ResponseMonad;
}());
exports.ResponseMonad = ResponseMonad;
