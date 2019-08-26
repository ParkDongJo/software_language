// 외부 다형성 높이기
// 1. _each()에 null을 넣어도 에러 안나게
//      _length() = _get('list')를 통해서 구현함
_each(users, console.log)
_each(null, console.log)

console.log( _filter(null, (v) => v))

_go(users,
    _filter((v) => v%2),
    _map((v) => v*v),
    console.log)

// 2. _keys() 다형성 높이기

// 3. _each() 다형성 높이기 2버전
_each(
    {13: 'ID', 19: 'HD', 23: 'UD'},
    (name) => {console.log(name)})

console.log( 
    _map({ 13: 'ID', 19: 'HD', 29: 'YD'},
        () => name.toLowerCase()) )