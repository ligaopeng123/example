function _Promise(fn) {
    const me = this;
    // 默认状态
    me.status = 'pending';
    // 保存成功数据
    me.data = null;
    //失败信息保存
    me.errData = null;
    // 成功回调 获取then里面成功的回调函数
    me.onResolveCallbacks = [];
    // 失败回调 获取then里面失败的回调函数
    me.onRejectedCallbacks = [];

    // 成功函数
    function resolve(data) {
        if (me.status === 'pending') {
            me.status = 'fulfilled';
            me.data = data;
            me.onResolveCallbacks.forEach((item) => {
                item(me.data);
            })
        }
    }

    /**
     * 失败处理函数
     * @param data
     */
    function reject(data) {
        if (me.status === 'pending') {
            me.status = 'rejected';
            me.errData = data;
            me.onRejectedCallbacks.forEach((item) => {
                item(me.errData);
            })
        }
    }

    // 执行函数
    try {
        fn(resolve, reject);
    } catch (err) {
        reject(err)
    }
}

_Promise.prototype.then = function (resolve, reject) {
    const me = this;
    const _setPromise = (_P, _resolve, _reject) => {
        // then返回值如果是_Promise类型 则执行then处理
        if (_P instanceof _Promise) {
            _P.then(_resolve, _reject)
        } else {
            _resolve(_P)
        }
    };
    // 如果状态为成功 执行resolve
    if (me.status === 'fulfilled') {
        return new Promise((_resolve, _reject) => {
            const _P = resolve(me.data);
            // 如果then函数的返回值是个_Promise 则执行_Promise.then函数
            // 否则将执行结果返回
            _setPromise(_P, _resolve, _reject);
        });
    }
    // 如果状态为成功 执行resolve
    if (me.status === 'rejected') {
        return new Promise((_resolve, _reject) => {
            const _P = reject(me.errData);
            _setPromise(_P, _resolve, _reject);
        });
    }
    if (me.status === 'pending') {
        return new Promise((_resolve, _reject) => {
            me.onResolveCallbacks.push(() => {
                const _P = resolve(me.data);
                _setPromise(_P, _resolve, _resolve, _reject);
            });
            me.onRejectedCallbacks.push(() => {
                const _P = reject(me.errData);
                _setPromise(_P, _resolve, _reject);
            });
        });
    }
};

_Promise.prototype.catch = function (fn) {
    return this.then(null, fn);
};

_Promise.all = function (iterables) {
    return new _Promise((resolve, reject) => {
        // 数据拼接
        let data = [];
        // 便利次数
        let index = 0;
        // 范围信息次数
        let resIndex = 0;
        for (let P of iterables) {
            // 防止乱序 获取then的正确顺序
            const dataIndex = index;
            P.then((res) => {
                // 保存信息
                data[dataIndex] = res;
                resIndex++;
                if (resIndex === data.length) {
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
            index++;
        }
        if (!index) resolve([]);
    });
};


_Promise.all([new _Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2222)
    }, 1000)
}), new _Promise((resolve, reject) => {
    resolve(4444)
})]).then((res)=> {
    console.log(res)
});


new _Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2222)
    }, 1000)
}).then((res) => {
    console.log(res)
    return new _Promise((_resolve, reject) => {
        setTimeout(() => {
            _resolve(4444)
        }, 1000);
    });
}).then((res) => {
    console.log(res)
})


new _Promise((resolve, reject) => {
    resolve(2222)
}).then((res) => {
    console.log(res)
    return new _Promise((_resolve, reject) => {
        _resolve(4444)
    });
}).then((res) => {
    console.log(res)
})

