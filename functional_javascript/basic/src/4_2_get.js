// _get 함수 만들어보기

// let _get = (obj, key) => {
//     return obj == null ? undefined : obj[key]
// }
let user1 = users[0]
console.log(user1.name)
console.log(_get(user1, 'name'))

// users[10]은 없는 값이기 때문에 에러가 발생함
// console.log(users[10].name)

// 내부에서 추가적인 작업을 해줬기에
// 에러없이 안전하게 값을 리턴함
console.log(_get(users[10], 'name'))