/*
    [ 피드벡 ]
    일단 구현은 다 완료를 함
    하지만 자바스크립트 부분에서 구현의 미숙함을 보임 특히 자주 사용해본 경험이 없는
    클래스, 인터페이스 등등에 대한 개념과 이해가 부족했음

    추가로 학습해야할 것
    - javascript class와 interface에 대한 이해가 필요로 하다
    - typescript에 대한 이해도가 좀 더 필요한 상황
    - typescript의 강점 왜 필요로 하는지 등등도 더 깊게 공부해볼 필요가 있다.
    - typescript에 대한 보충을 더해야함
    - 기본적인 자료구조, 알고리즘 문제는 반복 숙달 해야함
    - 객체 지향에 대한 공부도 추가로 필요할듯 함수지향과 비교해가면서 해보자

    장점으로 가져가야할 것
    - 일단 태도에 대한 점수를 좋게 받음, 면접에 대한 피드벡, 부족한점 좋은점 등등
    - 쉬는 시간에도 문제를 풀려는 의지를 보였고, 결국 해낸것에 대한 점수도 있는듯
    - 노션 개인 공부에 대한 정리를 굉장히 좋게 판단하였음 (이 부분을 계속 보강하고 좀 더 꼼꼼하게 학습해야 겠음)
    - 개념에 대해 상세하게 설명한 부분도 하였음
    - 모르는 부분을 빠르게 인정하는 태도는 좋았음
    
    개인적으로 아쉬운 부분
    - 개념적으로 상세히 설명을 했으나, 질문의 깊이가 들어가면 막히는 부분이 몇개 있었음
    - 리엑트에 대한 조금 디테일한 부분을 더 학습할 필요가 있음

    대답 못한 질문들
    - 리엑트에 key에 대한 설명( ref에 대한 것도 추가 질문이 들어올수 있으니 확실하게 할것 )
    - 타입스크립트 장점을 클래스 상속 뭐 어쩌구 나오면서 추가 질문에 막힘 ( 이건 객체지향 이해부족 및 타입스크립트 추가 검토로 극복 )
    - 클로저를 쓸때 조심해야할 점 ( 음.. 이건 더 공부해야할듯, 하지만 클로저 개념, 활용, 장점에 대해서는 잘 설명함)
    - 클래스에서 커서를 왜 멤버변수로 썼냐 ( 요것도 더 궁리를 해봐야할 질문임 )
 */

function fibo(n) {
  if (n==0) {
    return 0;
  } else {
    return 1;
  }
  return fibo(n-1) + fibo(n-2);
}


let memo = Array(100)
memo[0] = 0
memo[1] = 1
function fibo2(n) {
  if (n==0 || !!memo[n]) {
    return memo[n]; 
  }
  
  memo[n-1] = fibo2(n-1);
  memo[n-2] = fibo2(n-2);
  
  return memo[n-1] + memo[n-2];
}

console.log(fibo2(100))

class LinkedList {
  
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.cursro = null;
    }
    
    add(data) {
      if (this.isEmpty()) {
        this.head = new Node(data);
        this.tail = this.head;
        this.cursor = this.head;
      } else {
        let node = new Node(data);
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
      this.size++
    }
    get(idx) {
      let answer = -1
      
      if(!this.isEmpty() && idx < this.size) {
        for (let i=0; i<this.size; i++) {
          if (i == idx) {
            answer = this.cursor.data;
            break;
          }
          this.cursor = this.cursor.next;
        }
        this.cursor = this.head;
        
      }
      return answer;
    }
    remove(data) {
      if (this.isEmpty()) {
        return -1; 
      } else {
        for (let i=0; i<this.size; i++) {
          if (this.cursor.data == data) {
            if (i==0) {
                let tmp = this.cursor.next;
                this.cursor.next = null;
                this.head = tmp;
                this.cursor = tmp;
            }
            
            this.cursor.prev.next = this.cursor.next;
            this.cursor.next = null;
            this.cursor.prev = null;
            this.size--
            break;
          }
          this.cursor = this.cursor.next;
        }
        this.cursor = this.head;
        return 1;
      }
    }
    isEmpty() {
      return this.size == 0 
    }
  }
  
  class Node {
  
    constructor(data) {
      this.data = data
      this.prev = null
      this.next = null
    }
  }
  
  
  const list = new LinkedList()
  console.log('list.isEmpty()', list.isEmpty() === true)
  list.add(4)
  list.add(6)
  console.log('list.get(0) === 4', list.get(0) === 4)
  console.log('list.get(1) === 6', list.get(1) === 6)
  console.log('list.isEmpty()', list.isEmpty() === false)
  list.remove(4)
  console.log('list.get(0) === 6', list.get(0) === 6)