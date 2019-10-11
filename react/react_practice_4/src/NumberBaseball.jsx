import React, { Component, createRef, useState, useRef } from 'react';
import Try from './Try';

// this를 사용하지 않는다면, 밖에다 뺀다. 다른 곳에서도 사용할 수 있도록...
// this를 쓴다면, class 안에 쓴다.
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
/*
  splice() vs. slice()

  var array=[1,2,3,4,5];
  console.log(array.splice(2));
  This will return [3,4,5]. The original array is affected resulting in array being [1,2].

  var array=[1,2,3,4,5]
  console.log(array.slice(2));
  This will return [3,4,5]. The original array is NOT affected with resulting in array being [1,2,3,4,5].
*/
  for (let i=0; i<4; i+=1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
    arr.push(chosen);
  }

  return arr;
}

const NumberBaseball = () => {

  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (value === answer.join('')) {
      setResult('홈런');
      // 함수형 
      setTries((prevTries) => [...prevTries, { try: value, result: '홈런' }]);

      alert('게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();
    } else {
      const answerArr = value.split('').map((v) => parseInt(v));

      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join('')} 였습니다.`);

        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        for (let i=0; i<4; i += 1) {
          if (answerArr[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 였습니다.` }]);
        setValue('');
        inputEl.current.focus();
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {
          // react 반복문에서 key는 성능 최적화를 위해 꼭 넣어줘야한다.
          // key 값은 고유한 값이어야 한다.
          // key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 합니다.
          // 이때 반복문에 idx를 넣으면 key를 통한 성능 최적화가 문제가 된다.
          // react에서 key를 보고 변경된 dom을 찾고 변경시켜주는데, 이 값이 고유하지 않거나, idx를 넣어줘버리게 되면 문제가된다.

          // 1. 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것
          // 2. 최후의 수단 - 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있습니다. (하지만 비추!!!)

          // [ 왜 reactd에서 key에 idx를 넣지 말라는 것일까 ]
          // 여기서 중요한 것은 각각의 item에 들어가는 key는 안정적인 고유한 값이어야 한다는것,
          // 왜 여기서 map()쓰면서 생성되는 idx를 쓰지 말라는 걸까?
          // 그 해답은 javascript의 내부적인 특징에 있다. javascript는 배열이 결국 링크드 리스트 구조로 되어있다.
          // 링크드 리스트는 해당 값이 삭제되거나, 추가될 때마다 각 노드의 인덱스를 변경시켜준다.
          // 즉 map()에서 받을수 있는 idx는 안정적이지 않고 변화가능한 값이라는 것이다.
          // 이는 list에서 각 아이템을 제거하거나 추가하게 될때 문제가 된다.
          // 새로운 아이템이 추가 될때 key 값이 변화가 되는 값이라면, 해당 아이템 뿐만이 아니라, 그와 연관된 값들 조차도
          // 새롭게 생성이 된다. 이는 성능상 매우 비효율적이다.
          // 하지만 고유한 값을 key으로 지정하게 되면, 해당 값만 추가되고 다른 아이템은 유지가 될 수 있다. 자세한 설명은 아래의 블로그가 자세히 설명해줬다.
          // https://velopert.com/3636

          // [ 그렇다면 react에서 추천하는 방법은 ]
          // 1. 고유한 id 값을 넣도록 되어있다.
          // 2. 또는 변수.toString()을 통해 메모리 값을 key값으로 쓰는것도 예제로 보여지고 있다.
          // 3. react에서 추천한 블로그에서는 shortid 라이브러리를 활용하는 것을 최고 추천으로 하고 있다.
          // https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318


          // [ diff 알고리즘에 대해 알기 ]
          // react는 vitural돔이라는 개념을 가지고 있다. 이를 통해 state가 변경 되었을 시 변경되 엘리먼트를 감지하고 변경되 영역만 실제 돔에 반영한다.
          // 아마 다들 여기까지는 알고 있는 개념일 것이다. 근데 어떻게 변경시키는 걸까???

          // diff 알고리즘이라고 하면 일반적으로 두 tree의 차이를 비교하는 알고리즘이라고 생각하면된다.
          // 하지만 기존의 diff 알고리즘은 최악의 경우 O(N^3)의 시간복잡도가 나온다고 한다.
          // 사실 왜 그런지에 대해서 찾아보고 싶었지만, 쉽게 찾을 순 없었다.일단 그정도 걸린다고만 알고있자

          // 리엑트의 개선된 diff 알고리즘은 O(N) 까지 개선을 하였다. 핵심은 두가지이다.
          // - 1. 일단 type을 기준으로 비교를 한다. 만약 다르다면 해당 지점부터의 트리를 모두 갱신한다.(unmount -> mount 시킨다.)
          // - 2. 고유의 key가 존재한타면 key 매칭을 통해 비교를 한다.

          // 위의 기준을 통해 diff 알고리즘이 이뤄진다.
          // React의 JSX가 사실 이 virtual 돔과 연관이 있다.
          
          /*
            [ 우리가 작성하는 jsx ]
            <div className='cn'>
              Content!
            </div>

            [ 실제 react에서 내부적으로 짜여지는 코드 ]
            React.createElement(
              'div',
              { className: 'cn' },
              'Content!',
              'Content 2!'
            );

            [ 이를 통해 Virtual 돔 노드 구성 ]
            {
              type: 'div',
              props: {
                className: 'cn',
                children: [
                  'Content 1!',
                  'Content 2!'
                ]
              }
            }
          */

          // 일단 더 자세한 사항은 아래의 블로그를 참고하자
          // https://www.holaxprogramming.com/2018/04/15/react-optimizing-virtual-dom-explained/
          // https://reactjs.org/docs/introducing-jsx.html
          // https://meetup.toast.com/posts/110
          // https://www.cronj.com/blog/diff-algorithm-implemented-reactjs/

          // 성능상의 문제와 가독성의 문제로 <Try />로 컴포넌트로 나뉨
          tries.map((v, i) => (
            <Try key={`${i+v}차 시도`} tryInfo={v} index={i} />
          ))

        }
      </ul>
    </>
  );
};


// class NumberBaseball extends Component {
//   state = {
//     result: '',
//     value: '',
//     answer: getNumbers(),
//     tries: [], // push 쓰면 안된다.
//   }

//   // react는 배열에 새로운 요소를 삽입할 때 push()를 한다면
//   // 새롭게 변경되는 값을 감지하지 못한다.
//   // [...array(기존 arr), newVal(새로운 값)]
//   /*
//     arr2 = [...arr, val]
//     arr2 == arr -> false -> 변경된 값임을 인지하고 rendering 된다. -> immutable 하다

//     arr.push(val)
//     arr == arr -> true -> 변경된 값을 인지하지 못한다. arr의 참조 값은 같다! -> mutable 하다
//   */
//   onSubmitForm = (e) => {
//     e.preventDefault();
//     const { value, answer, tries } = this.state;

//     if (value === answer.join('')) {
//       this.setState((prevState) => ({
//         result: '홈런',
//         tries: [...prevState.tries, { try: value, result: '홈런' }],
//       }));
//       alert('게임을 다시 시작합니다.');
//       this.setState({
//         value: '',
//         answer: getNumbers(),
//         tries: [],
//       });
//       this.inputRef.current.focus();
//     } else {
//       const answerArr = value.split('').map((v) => parseInt(v));

//       let strike = 0;
//       let ball = 0;
//       if (tries.length >= 9) {
//         this.setState({
//           result: `10번 넘게 틀려서 실패! 답은 ${answer.join('')} 였습니다.`
//         });
//         alert('게임을 다시 시작합니다.');
//         this.setState({
//           value: '',
//           answer: getNumbers(),
//           tries: [],
//         });
//         this.inputRef.current.focus();
//       } else {
//         for (let i=0; i<4; i += 1) {
//           if (answerArr[i] === answer[i]) {
//             strike += 1;
//           } else if (answer.includes(answerArr[i])) {
//             ball += 1;
//           }
//         }
//         this.setState((prevState) => ({
//           tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 였습니다.` }],
//           value: '',
//         }));
//         this.inputRef.current.focus();
//       }
//     }
//   }

//   onChangeInput = (e) => {
//     console.log(this.state.answer);
//     this.setState({
//       value: e.target.value,
//     });
//   }
//   inputRef = createRef();

//   render() {
//     const { tries } = this.state;

//     return (
//       <>
//         <h1>{this.state.result}</h1>
//         <form onSubmit={this.onSubmitForm}>
//           <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
//         </form>
//         <div>시도: {tries.length}</div>
//         <ul>
//           {
//             // react 반복문에서 key는 성능 최적화를 위해 꼭 넣어줘야한다.
//             // key 값은 고유한 값이어야 한다.
//             // 이때 반복문에 idx를 넣으면 key를 통한 성능 최적화가 문제가 된다.
//             // react에서 key를 보고 변경된 dom을 찾고 변경시켜주는데, 이 값이 고유하지 않거나, idx를 넣어줘버리게 되면 문제가된다.

//             // 성능상의 문제와 가독성의 문제로 <Try />로 컴포넌트로 나뉨
//             tries.map((v, i) => (
//               <Try key={`${i+v}차 시도`} tryInfo={v} index={i} />
//             ))
//           }
//         </ul>
//       </>
//     );
//   }
// }

export default NumberBaseball;

// es2015 moudule 문법
// export const bye = 'bye';
// export const hello = 'hello'; // 여러번 가능, import { hello, bye } 형식으로 외부에서 사용
// export default NumberBaseball; // 한번만 사용가능, import NumberBaseball 형식으로 외부에서 사용


// node의 module 문법 - commonJs 문법
// const React = require('react');
// exports.hello = 'hello';
// module.exports = NumberBaseball;