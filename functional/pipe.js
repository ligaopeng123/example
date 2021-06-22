/**
 * pipe 函数
 */
export const pipe = (...fns) => {
    if (fns.length === 0)
        return (arg) => arg;
    if (fns.length === 1)
        return fns[0];
    /**
     * 巧妙利用reduce的一直拼接特性 从左到右执行
     * 返回一个无限包裹的函数(x)=> d(c(b(a(x))))
     */
    return fns.reduce((a, b) => (...args) => b(a(...args)));
};
