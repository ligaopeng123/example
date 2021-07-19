"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
// SymbolTable
// 中文所有汉字 -> 词语 -> 中文所有的词语
function throttle(fn, interval = 16) {
    let open = true;
    return (...args) => {
        if (!open) {
            return;
        }
        open = false;
        fn(...args);
        const ts = new Date().getTime();
        const mod = ts % interval;
        setTimeout(() => {
            open = true;
        }, interval - mod);
    };
}
exports.throttle = throttle;
// let counter = 0
// const onMouseMove = throttle(() => {
// 	console.log('move', counter)
// })
// const I = setInterval(() => {
// 	if(counter ++ === 1000) {
// 		clearTimeout(I)
// 	}
// 	onMouseMove()
// }, 1)
//# sourceMappingURL=02-throttle.js.map