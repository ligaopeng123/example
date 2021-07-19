//例： 求一串由数字组成的字符串的最大值
const numStr = '1 4 2 99 5 2 0 44';
// 将字符串转为数组
/**
 * 将字符串转为数组
 * 输入输出 str => []
 * @param str
 */
const strToArr = str => str.splite(' ');
/**
 * 将字符串转为int类型
 * 输入输出str => int
 * @param str
 */
const strToNum = str => Number(str);
/**
 * 将字符串数组 转换为数字数组
 * [str] => [int]
 * @param strs
 */
const strsToNum = strs => strs.map(strToNum);
/**
 * 求最大值
 * 输入输出 [int] => int
 * @param arr
 */
const getMax = arr => Math.max(...arr);
/**
 * 命令式方式
 */
const getMaxByStr1 = (strs) => {
    /**
     * 各个输入输出
     * str => [str]
     * [str] => [int]
     * [int] => int
     */
    const strsArr = strToArr(strs);
    const numStrs = strsToNum(strsArr);
    const max = getMax(numStrs);
    return max;
};
getMaxByStr1(numStr);
/**
 * point-free风格
 * 将函数组合 不关心参数之间的转换
 */
const getMaxByStr2 = R.pipe(strToArr, strsToNum, getMax);
getMaxByStr2(numStr);
//# sourceMappingURL=point-free.js.map