/**********************************************************************
 *
 * @模块名称: useState
 *
 * @模块用途: useState
 *
 * @date: 2021/7/1 8:32
 *
 * @版权所有: pgli
 *
 **********************************************************************/
var ALLSTATE = []; // 保存所有的state
var stateIndex = 0; // 标记state个数
var _useState = function (initialValue) {
    var currentIndex = stateIndex;
    ALLSTATE[currentIndex] = ALLSTATE[currentIndex] || initialValue;
    var setState = function (newValue) {
        ALLSTATE[currentIndex] = newValue;
        //调用render函数触发重新渲染
        // render();
    };
    stateIndex++;
    return [ALLSTATE[currentIndex], setState];
};
// 怎么销毁呢？fiber每个组件都有一个ALLSTATE
var TestComponent = function (n) {
    stateIndex = 0;
    var _a = _useState(n), state = _a[0], setState = _a[1];
    setTimeout(function () {
        console.log(state);
    }, 3000);
    setState(n++);
};
TestComponent(1);
TestComponent(2);
