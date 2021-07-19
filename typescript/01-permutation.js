// import {Set} from 'immutable'
// imutable
function remove(set, i) {
    const newSet = new Set([...set]);
    newSet.delete(i);
    return newSet;
}
function permutation(str) {
    function R(set) {
        if (set.size === 1) {
            return [set.values().next().value];
        }
        // abc a b c
        return flattern([...set].map((char) => R(remove(set, char)).map((perm) => char + perm)));
    }
    return R(new Set([...str]));
}
function flattern(array) {
    if (!Array.isArray(array)) {
        return array;
    }
    return [].concat(...array.map(flattern));
}
// console.log(flattern([1,2,3,[4,5,[6]]]))
console.log(permutation("abc"));
//# sourceMappingURL=01-permutation.js.map