const ALLDEPEND = []; // 存储所有的依赖
const ALLEFFECT = []; // 存储所有的副作用
let index = 0;
const _useEffect = (callback, depends) => {
	ALLEFFECT[index] = ALLEFFECT[index] || callback;
	const currentDepend = ALLDEPEND[index] || depends;
	// 不考虑复杂的变化比较
	const isChange = !ALLDEPEND[index]
		|| depends.some((depend, i) =>
			depend !== currentDepend[i]);
	if (isChange) {
		// 存储变更后的数据
		ALLDEPEND[index] = depends;
		// 执行缓存的callback
		if (ALLEFFECT[index]) ALLEFFECT[index]()
	}
	index++;
};

const TestComponent = (dep) => {
	// 测试 此处需要重新赋值index 避免一直添加
	// fiber每个组件都有一个effect管理
	index = 0;
	_useEffect(() => {
		console.log(111)
	}, dep);
};

TestComponent([0, 1]);
setTimeout(() => {
	TestComponent([0, 1]);
	console.log(`已经执行`)
}, 2000);

setTimeout(() => {
	TestComponent([1, 0]);
}, 3000);