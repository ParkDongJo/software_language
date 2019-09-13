// 외부 다형성 높이기
// 1. _each()에 null을 넣어도 에러 안나게
//      _length() = _get('list')를 통해서 구현함
//      형 체크를 하지 않고 흘려보내듯이 구현함
_each(users, console.log)
_each(null, console.log)

console.log( _filter(null, (v) => v))

_go(users,
    _filterr((user) => user.age < 30),
    _mapr((user) => user.name),
    console.log)

// 2. _keys() 다형성 높이기
// javascript에도 Object.keys()라는 메서드가 있다.
// {}, [], Number, String 등의 키를 뽑아서 배열로 리턴하는 기능이다.
// 다만 null을 넣었을 시 에러가 난다..
// 이를 좀더 고차원적인 다형성을 지원하는 함수를 만들어 보자


// 3. _each() 다형성 높이기 2버전
// 기존 _each()는 내부적으로 [](배열) 만 동작하도록 구현되었다.
// 하지만 {}(객체=맵=json)같은 경우 []은 아니지만 배열처럼 순회를 할수 있는 리스트 구조이다.
// 이를 좀더 고차원적인 다형성을 지원하는 함수를 만들어 보자.

_each(
    {13: 'ID', 19: 'HD', 23: 'UD'},
    (name) => {console.log(name)})

console.log( 
    _map({ 13: 'ID', 19: 'HD', 29: 'YD'},
        (name) => name.toLowerCase()) )

_go({13: 'ID', 19: 'HD', 29: 'YD'},
    _mapr((name) => name.toLowerCase()),
    console.log
)

_go(users,
    _mapr((user) => user.name),
    _mapr((name) => name.toLowerCase()),
    console.log
    )

// null 이 첫번째 인자로서 데이터로 들어가도
// 에러가 나지 않고 자연스럽게 프로그램이 진행 될수 있도록 외부 다형성을
// 지원하게끔 함수형 프로그래밍에서는 구현하는 것이 일반적이다.
_go(null,
    _mapr((user) => user.name),
    _mapr((name) => name.toLowerCase()),
    console.log
    )

_go({1: users[0], 3: users[2], 5: users[4]},
    _mapr((user) => user.name.toLowerCase()),
    console.log
    )