
/*
  javascript에서 array는 참조형 데이터이다.
  그렇기 때문에, array를 얕은 복사를 하게 되면, 주소값이 복사가 된다.

  마찬가지로 배열을 리턴했을 시 해당 배열의 주소값이 리턴 되는데,
  이는 해당 배열을 외부에서 쉽게 조작할 수 있다.

  아래와 같이 스냅샷 저장 순간의 데이터를 보존하고 싶다면,
  return을 기존 array를 바탕으로 한 새로운 array를 생성해주면된다.

  여러 방법이 있겠지만,
  [...arr]
  Array.assgin(arr)
  Array.from(arr)
  중에서 가장 성능이 좋게 나온 놈으로 구현했다.
*/
class Snapshot {
    constructor(array) {
      this.array = Array.from(array);
    }
    
    restore() {
      return Array.from(this.array);  
    }
}

var array = [1, 2];
var snap = new Snapshot(array);
array[0] = 3;
array = snap.restore();
console.log(array.join()); //It should log "1,2"
array.push(4);
array = snap.restore();
console.log(array.join()); //It should log "1,2"