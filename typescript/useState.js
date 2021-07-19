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
const ALLSTATE = []; // 保存所有的state
let stateIndex = 0; // 标记state个数
const _useState = (initialValue) => {
    const currentIndex = stateIndex;
    ALLSTATE[currentIndex] = ALLSTATE[currentIndex] || initialValue;
    const setState = (newValue) => {
        ALLSTATE[currentIndex] = newValue;
        //调用render函数触发重新渲染
        // render();
    };
    stateIndex++;
    return [ALLSTATE[currentIndex], setState];
};
// 怎么销毁呢？fiber每个组件都有一个ALLSTATE
const TestComponent = (n) => {
    stateIndex = 0;
    const [state, setState] = _useState(n);
    setTimeout(() => {
        console.log(state);
    }, 3000);
    setState(n++);
};
TestComponent(1);
TestComponent(2);
//# sourceMappingURL=useState.js.map