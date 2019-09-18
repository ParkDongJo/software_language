import React, { Component, useState } from 'react';
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

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (value === answer.join('')) {
      setResult('홈런');
      setTries((prevTries) => [...prevTries, { try: value, result: '홈런' }]);

      alert('게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
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
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {
          // react 반복문에서 key는 성능 최적화를 위해 꼭 넣어줘야한다.
          // key 값은 고유한 값이어야 한다.
          // 이때 반복문에 idx를 넣으면 key를 통한 성능 최적화가 문제가 된다.
          // react에서 key를 보고 변경된 dom을 찾고 변경시켜주는데, 이 값이 고유하지 않거나, idx를 넣어줘버리게 되면 문제가된다.

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
//       }
//     }
//   }

//   onChangeInput = (e) => {
//     console.log(this.state.answer);
//     this.setState({
//       value: e.target.value,
//     });
//   }

//   render() {
//     const { tries } = this.state;

//     return (
//       <>
//         <h1>{this.state.result}</h1>
//         <form onSubmit={this.onSubmitForm}>
//           <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
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