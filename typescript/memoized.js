"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMemoized = exports.memoized = void 0;
const memoized = (fn) => {
    // 缓存求值 如果有则取缓存 如果没有则赋值
    const cache = {};
    return function memoiz(arg) {
        return cache[arg] || (cache[arg] = fn(arg));
    };
};
exports.memoized = memoized;
const square = (n) => {
    if (!n)
        return 1;
    return n * square(--n);
};
const memoizedSquare = exports.memoized(square);
memoizedSquare(5);
const asyncMemoized = (fn) => {
    // 缓存求值 如果有则取缓存 如果没有则赋值
    const cache = {};
    return function memoiz(arg) {
        return __awaiter(this, void 0, void 0, function* () {
            cache[arg] || (cache[arg] = yield fn(arg));
            return [cache[arg], cache];
        });
    };
};
exports.asyncMemoized = asyncMemoized;
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch('***');
});
const asyncMemoizedGetData = exports.asyncMemoized(getData);
//# sourceMappingURL=memoized.js.map