import React, { Component, memo } from 'react';

// [ props와 state의 차이 이에 대한 대응 ]
// props - 부모에게서 넘겨받은 값, 속성으로 property의 줄임말이다. props는 원칙상 자식에서 부모의 값을 변경하지 못하도록 되어있다.
//      실제로 직접적으로 영향을 줄 순 없다. 그렇기 때문에, 만약 변경을 하고자 한다면, props를 변경시키는 함수를 부모컴포넌트에서 함께
//      넘겨 준다. 이 함수를 자식 컴포넌트에서 호출시켜서 부모 컴포넌트에서 state를 변경하게끔 하고, 이를 다시 props로 받는 형태로 만들어 진다.

// state - state는 말 그대로 상태 값이다. 각 컴포넌트가 자신이 보유하고 있는 값들을 가르킨다. 이 상태값을 통해 동적인 데이터 변경이 가능하게끔 한다.
//    state의 변경은 this.setState()로 한다. 간혹 this.state = 로 값을 변경시키기도 한다. 하지만 이것은 실제 state가 변경된 것이 아니다.
//    컴포넌트 내에 임시로 지정된 state를 변경시키는 형태이다. 즉 이를 relflesh하게 되면 휘발성 데이터로써 다시 원상 복귀하게 된다.
//    즉 실제 state 변경은 this.setState()로만 한다.
//
//    [ this.setState()는 비동기식 ]
//    this.setState()는 비동기식으로 작동한다. 왜일까? 이는 react는 내부적으로 this.setState() 를 통해 변경된 state를 모아뒀다가, 한꺼번에 batch() 하는
//    형태로 변경되기 때문이다. 이를 통해 연산이 무분별하게 이뤄지는 것을 막고 연산 효율성을 증대시킨다.

// [ props에 변경에 대한 최적화 ]
// this.setState()를 하게 되면, react 컴포넌트 생명주기인 shouldUpdateComponent()를 타게 된다. 여기서 이전 state값과 새로운 state값을 비교하여, 다르면 내부적으로
// true를 리턴시켜주고, true이면 render()가 실행된다.
// 그렇다면 만약 값이 같을땐????
// 실제로 실험을 해보면, 만약 shouldUpdateComponent()에 어떠한 설정을 하지 않았을 경우, 값이 동일 할 때도 render()을 타게 된다.
// 기본적으로 이러한 경우 크게 문제가 될 일은 없다. 하지만 만약 부모 컴포넌트에서 props를 넘겨주는 상황이고, 이 props에 대한 render()가 호출 될때, 이는
// 자식 컴포넌트들에게도 영향을 주게 되고, 만약 자식의 관계가 깊어질때 성능에 영향을 주게 될 것이다.
// 이럴 때를 대비하여, 자식 컴포넌트 내부의 shouldUpdateComponent()에서 이전값과 새로운값에 대한 비교를 해주고 true 또는 false를 넘겨줘야한다.
// https://velopert.com/3629

// react Hooks는 shouldUpdateComponent() 또는 PureComponent 대신에
// memo()라는 함수를 쓴다.
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

// class Try extends Component {
//   render() {
//     return (
//       <li>
//         <div>{this.props.tryInfo.try}</div>
//         <div>{this.props.tryInfo.result}</div>
//       </li>
//     );
//   }
// }

export default Try;
