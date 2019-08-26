// _keys() 만들기
// javascript 내부 함수 key()
console.log(Object.keys( { name: 'ID', age: 33 } ))
console.log(Object.keys( [1,2,3,4] ))
console.log(Object.keys( 10 ))
// console.log(Object.keys( null ))

// null이 들어가도 에러 처리가 안되게

// let _is_object = () => {
//     return typeof obj == 'object' && !!obj
// }

// let _keys = () => {
//     return _is_object(obj) ? Object.keys(obj) : []
// }
