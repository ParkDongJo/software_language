/**
 * Map()
 */
console.log("Map()=================================")
let cache = new Map().set('a', 1).set('b', 2);

console.log([...cache.keys()]); // ['a', 'b']
console.log([...cache.values()]); // [1, 2]

let iterObj = cache.entries();
console.log(iterObj.next());
console.log(iterObj.next());

for (let key of cache) {
    console.log(key);
}
cache.forEach((v, k) => {
    console.log(v);
})


/**
 * Set()
 */
console.log("Set()=================================")
let setA = new Set();
setA.add('a');
setA.add('b');
setA.add('a');  // 중복 허용 X
console.log([...setA.keys()]); // ['a', 'b']
console.log([...setA.values()]); // ['a', 'b']

let entries = setA.entries();
console.log(entries.next());
console.log(entries.next());

setA.forEach((v, k) => {
    console.log(v);
})