// 파이프라인 라인 만들기

// _pipe() 는 함수를 인자로 받아서, 받은 함수를 연속적으로 실행해주는 함수
// _pipe(fn, fn, fn) fn들을 연속적으로 실행해줌
// 함수를 리턴하는 pipe 함수
// function _pipe() {
//     let fns = arguments;
//     return (arg) => {
//         return _reduce(fns, (arg, fn) => {
//             return fn(arg);
//         }, arg);
//     }
// }

let f1 = _pipe(
    (a) => a+1,
    (a) => a*2,
    (a) => a*2
)

console.log(f1(1))

// _go()는 첫번째 함수는 변수를 받고 두번째 인자부터는 함수를 받음
// _go()는 _pipe()의 즉시 실행 버전
// function _go(arg) {
//     let fns = _rest(arguments);
//     return _pipe.apply(null, fns)(arg)
// }

_go(1,
    (a) => a+1,
    (a) => a*2,
    (a) => a*2,
    console.log
    )


_map( 
    _filter(users, (user)=> user.age >= 30), 
    _get('name') )

// _go() 함수를 이용하여
// 위의 코드를 좀 더 사람이 읽기 쉽도록
// 코드의 흐름에 따라 작성할 수 있다.
_go(users,
    (users) => {
        return _filter(users, (user) => user.age >= 30)
    },
    (users) => _map(users, _get('name')),
    console.log
    )

// _map()과 _filter()에 curryr() 함수를 적용시킨
// _mapr()과 _filterr()을 적용시킨다면,
// 훨씬더 간결한 코드를 짤 수 있다.
// 이와같이 curryr()을 통해서 함수의 평가 시점을 자유자재로 바꾼다면,
// 훨씬 더 가독성 좋은 코드를 만들수 있다
_go(users,
    _filterr(user => user.age >= 30),
    _mapr(_get('name')),
    console.log
    )

// 이렇게 함수형 프로그래밍은
// 순수함수들을 평가시점을 바꾸면서, 여러 함수의 조합성을 다루고, 추상화의 단위를 함수로 다루는
// 프로그래밍 기법이다.
