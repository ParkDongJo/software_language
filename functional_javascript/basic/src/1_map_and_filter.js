

// 명령형 코드
// 1. 30세 이상 users를 거른다.
let temp_users = [];
for (let i=0; i<users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i])
    }
}
console.log(temp_users)

// 2. 30세 이상인 users의 names를 수집한다.
let names = [];
for (var i=0; i<temp_users.length; i++) {
    names.push(temp_users[i].name)
}
console.log(names);

// 3. 30세 미만인 users를 거른다.
let temp_users2 = [];
for (let i=0; i<users.length; i++) {
    if (users[i].age < 30) {
        temp_users2.push(users[i])
    }
}
console.log(temp_users2);

// 4. 30세 미만인 users의 ages를 수집한다.
let ages = [];
for (let i=0; i<temp_users2.length; i++) {
    ages.push(temp_users2.age)
}
console.log(temp_users2);


console.log("----------------------------")

// 함수형
// 추상화의 최소 단위를 함수로 구현하는 것이 함수형 프로그래밍
// 1. 30세 이상 users를 거른다.

// 응용형 함수 =
// 함수를 인자로 받아서 원하는 시점에, 원하는 조건을 적용하여 결과물을 만들어내는 함수

// 고차함수 =
// 함수를 인자로 받아서 함수 내부에서 인자 함수를 실행시키는 함수

// 보조함수 =
// 여기에 인자로 들어가는 predi(), iter(), mapper() 같은 함수 내부에서 특정 수행을 위한 함수


console.log(_filter(users, (user)=> user.age >= 30));
console.log(_filter(users, (user)=> user.age < 30));


let over_30 = _filter(users, (user)=> user.age >= 30)
let names_over_30 = _map(over_30, (user) => user.name )
console.log(names_over_30)

let under_30 = _filter(users, (user)=> user.age < 30)
let ages_under_30 = _map(under_30, (user) => user.age )
console.log(ages_under_30)


// 코드가 간결하고 완성도 높고 테스트가 용이한 코드를 만들수 있다.
_map(
    _filter(users, (user)=> user.age >= 30),
    (user) => user.name
)

_map(
    _filter(users, (user)=> user.age < 30),
    (user) => user.age
)
