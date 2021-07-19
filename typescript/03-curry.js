// Y-combinator
function curry(f) {
    const g = (...args) => {
        if (args.length >= f.length) {
            return f(...args);
        }
        return (...left) => {
            return g(...args, ...left);
        };
    };
    return g;
}
function __add(a, b, c, d) {
    return a + b + c + d;
}
function __add2(a, b) {
    return a + b;
}
const add = curry(__add);
const add2 = curry(__add2);
console.log(add2(1, 2), add2(1)(2));
console.log(add(1, 2, 3, 4));
console.log(add(1)(2)(3)(4));
console.log(add(1, 2)(3)(4));
console.log(add(1, 2)(3, 4));
//# sourceMappingURL=03-curry.js.map