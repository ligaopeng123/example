"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _02_throttle_1 = require("./02-throttle");
function interpolation(rangeA, rangeB) {
    const LA = rangeA[1] - rangeA[0];
    const LB = rangeB[1] - rangeB[0];
    return (a) => {
        if (a > rangeA[1]) {
            return rangeB[1];
        }
        if (a < rangeA[0]) {
            return rangeB[0];
        }
        const ratio = (a - rangeA[0]) / LA;
        return Math.round(ratio * LB + rangeB[0]);
    };
}
function combine(fn1, fn2) {
    return (a) => {
        return fn2(fn1(a));
    };
}
// [0, 1]
class Animated {
    constructor(mapF) {
        this.value = 0;
        this.timerFN = timer;
        this.start = (tick, last, callback) => {
            this.timerFN(v => {
                this.updateValue(v);
                callback(this.getValue());
            }, tick, last);
        };
        this.mapF = mapF;
    }
    getValue() {
        return this.mapF(this.value);
    }
    updateValue(a) {
        this.value = a;
        return this;
    }
    map(fn) {
        const newMapF = combine(this.mapF, fn);
        return new Animated(newMapF);
    }
    static of(from, to) {
        const mapFunc = interpolation([0, 1], [from, to]);
        return new Animated(mapFunc);
    }
}
const raf = setTimeout;
const timer = (callback, tick = 16, last = 300) => {
    const start = new Date().getTime();
    const cb = _02_throttle_1.throttle(callback, tick);
    function rafLoop() {
        raf(() => {
            const ratio = (new Date().getTime() - start) / last;
            if (ratio > 1) {
                cb(1);
                return;
            }
            cb(ratio);
            rafLoop();
        });
    }
    rafLoop();
};
const str = "Hi, greetings....";
const a = Animated.of(0, str.length)
    .map(i => {
    return str.slice(0, i);
});
a.start(300, 5000, () => {
    console.clear();
    console.log(a.getValue());
});
//# sourceMappingURL=04-animated.js.map