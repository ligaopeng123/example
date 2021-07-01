const memoized = (fn) => {
    const cache = {};
    return (arg) => {
        return cache[arg] || (cache[arg] = fn(arg));
    };
};
const square = (n) => {
    if (!n)
        return 1;
    return n * square(--n);
};
const memoizedSquare = memoized(square);
console.log(memoizedSquare(6));
