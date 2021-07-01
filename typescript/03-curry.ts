
declare type FNCurry = (...args : Array<any>) => any
// Y-combinator
function curry( f : FNCurry) {
	const g = (...args : Array<any>) => {
		if (args.length >= f.length) {
			return f(...args)
		}

		return (...left : Array<any>) => {
			return g(...args, ...left)
		}
	}
	return g
}

function __add(a : number, b : number, c : number, d : number) {
	return a+b+c+d
}

function __add2(a :number, b : number) {
	return a + b
}



const add = curry(__add)
const add2 = curry(__add2)

console.log(add2(1,2), add2(1)(2))
console.log(add(1,2,3,4))
console.log(add(1)(2)(3)(4))
console.log(add(1,2)(3)(4))
console.log(add(1,2)(3,4))

