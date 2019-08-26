// 함수가 함수를 실행하거나, 함수가 함수를 포함하거나 등등
// 함수와 함수를 조합하여 프로그래밍 하는 특징 또한 함수형 프로그래밍의 특징이다.

/*
    [ 참고 사항 ]
    Arguments object
    Arrow functions don’t have the local variable arguments as do other functions.
    The arguments object is an array-like object that allows developers to dynamically discover 
    and access a function’s arguments. This is helpful because JavaScript functions can take an unlimited number of arguments.
    Arrow functions do not have this object.

    즉 es6 이후 버전에서 arrow function을 사용할 경우
    arguments object를 사용할수 없다.

    In most cases, using rest parameters is a good alternative to using an arguments object.
    굳이!! 굳이!! 사용을 하겠다 한다면, 고로 일반적인 함수로 표현해야한다. ...표현을 통해
    명시를 해주면서 사용하는 것이 좋다.

    function foo(n) { 
        var f = (...args) => args[0] + n;
        return f(10); 
    }

    foo(1); // 11

*/
// 커리 =
// 커리는 필요한 인자를 모두 채울떄 까지 인자를 적용해 나가다가
// 모든 인자갯수가 채워지면 함수의 본체를 실행하는 기법!!
// function _curry(fn) {
//     return (a, b) => {
//         return arguments.length == 2 ? fn(a,b) : (b) => fn(a,b)
//     }
// }

let add = _curry((a, b) => {
    return a+b;
})

// curry 사용
let add10 = add(10)
console.log(add10(5))
console.log( add(5)(3) )
console.log(add(5,10))


let sub = _curry((a,b) => a-b)

console.log( sub(10, 5) )

// 표현이 안맞음 sub10(5) 가 의미상으로는 5-10으로 비춰짐
// sub(a,b) 이기 때문에
let sub10 = sub(10)
console.log( sub10(5))

// 오른쪽에서 부터 인자를 적용해나가는 커리 함수를 만들자
// function _curryr(fn) {
//     return (a, b) => {
//         return arguments.length == 2 ? fn(a,b) : (b) => fn(b, a)
//     }
// }
sub = _curryr((a,b) => a-b)
// 표현이 안맞음 sub10(5) 가 의미상으로는 5-10으로 비춰짐
// sub(a,b) 은 _curryr() 로 만들었기 때문에,
// sub10(5)은 -5 값을 리턴하게 되어, 의미에 맞는 결과값을 구현할 수 있게 됨
sub10 = sub(10)
console.log( sub10(5))


// 커링은 어디에 활용할까?????
// _get() 함수에 _curryr()을 적용해보자
// 기존 아래와 같은 코드를
console.log( (user) => user.name )

// 이렇게 또는..
console.log(_get('name')(users[0]))

// 아래와 같이 명확한 의미의 함수를 사용할 수 있다.
let get_name = _get('name')
console.log(get_name(users[0]))
console.log(get_name(users[1]))
console.log(get_name(users[2]))




// 커링을 적용한 _get()를 썼을 때
// 아래와 같이 훨씬 간결하고 안전한 코드를 짤수 있다.
_map( 
    _filter(users, (user)=> user.age >= 30), 
    _get('name') )
_map( 
    _filter(users, (user)=> user.age >= 30), 
    _get('age') )