import React, { Component, PureComponent } from 'react'

// [ 방법 2. ]
// PureComponent를 사용하면 된다. (여러 블로그를 봤을때, 생각처럼 성능에 차이가 나진 않는다고 한다.)
// 하지만 state가 {}, [] 같은 참조형 데이터에 대해서는 내부 값이 변경되거나 추가되었을 시
// 레퍼런스에는 전혀 변화가 없기때문에, 변경된 값을 감지할 수가 없다!!!
class Test extends PureComponent {
    state = {
        counter: 0,
        // 자룟구조를 복잡하게 두지는 마라!!
        array: []
    };

    /*
        React는 기본적으로 state와 props가 변경되면 re-rendering이 된다.
        하지만, 단순히 this.setState({}) 만 해준다해도, re-rendering 된다.
        만약 변화된 값이 없다면, 매우 비효율적인 상황이 발생한다.
    */
    onClick = () => {
        // 아래와 같이 하고 setState() 하면 감지 하지 못함
        //this.state.array.push(1);

        // 아래와 같이 해줘야한다.
        this.setState({
            array: [...this.state.array, 1]
        })
    }

    // [ 방법 1. ]
    // 그래서 shouldComponentUpdate() 에서 이전 state, 와 현재 state(props) 를
    // 비교해서, 변화가 있을 시에만, rendering 하도록 최적화 할 수 있음
    //  
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>click</button>
            </div>
        )
    }
}