declare type FNThrottle = (...args :Array<any>) => void

// SymbolTable


// 中文所有汉字 -> 词语 -> 中文所有的词语
export function throttle(fn : FNThrottle, interval = 16) {

	let open = true
	return (...args : Array<any>) => {
		if(!open) {
			return
		}
		open = false 
		fn(...args)
		const ts = new Date().getTime()
		const mod = ts % interval
		setTimeout(() => {
			open = true
		}, interval - mod)
	}
}

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