
// reduce는 전달받은 배열 값을 함께 전달받은 func와 함께
// 복잡한 로직을 안전하게 처리해준다.
// iter(iter(iter(0, 1), 2),3)
// function _reduce(list, iter, memo) {
//     if (arguments.length == 2) {
//         memo = list[0]
//         list = _rest(list);
//     }

//     _each(list, (val)=>{
//         memo = iter(memo, val)
//     })
//     return memo
// }

// list를 받아서 자를 만큼의 num를 받는 함수
// let _rest = (list, num) => {
//     return Array.prototype.slice.call(list, num || 1)
// }

let add = (a,b) => a+b

console.log(
    _reduce([1,2,3], add, 0)
)
console.log(
    _reduce([1,2,3], add)
)