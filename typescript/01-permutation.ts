// import {Set} from 'immutable'
// imutable
function remove<T>(set : Set<T>, i : T) {
	const newSet  = new Set<T>([...set])
	newSet.delete(i)
	return newSet
}



function permutation(str : string) {
	function R(set : Set<string>) : Array<string> {
		if(set.size === 1) {
			return [set.values().next().value]
		}

		// abc a b c
		return flattern([...set].map((char) =>
      R(remove(set, char)).map((perm) => char + perm)
    ))
	}
	return R(new Set([...str]))
}



function flattern(array : Array<any>) : Array<any> {
	if(!Array.isArray(array)) {
		return array
	}
	return ([] as Array<any>).concat(...array.map(flattern))
}


// console.log(flattern([1,2,3,[4,5,[6]]]))
console.log(permutation("abc"))