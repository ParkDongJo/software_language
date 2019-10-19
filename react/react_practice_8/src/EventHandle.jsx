import React, { Component, PureComponent } from 'react'

// React 이벤트 핸들링에 대해 정리하고자 한다.
// 
// 이벤트가 발생했을 시 두가지 이벤트 흐름이 존재한다.
// - 이벤트 캡처링
// - 이벤트 버블링
// 
// 이 두가지 이벤트 흐름이 있다. 해당 이벤트 흐름을 활용하면, 훨씬 효과적인 이벤트 핸들링을 할 수있다.
// 예를 들어 부모 엘리멘트에서 이벤트를 발생시키고 자식들이 이벤트 캡쳐링을 활용하여 분기문을 통해,
// 효율적인 코드로 단번에 제어할 수 있다던지 등을 할 수 있다.

// 리엑트는 이와 관련해서 Event wrapper를 따로 제공한다. 해당 wrapper에는 실제 native event와 동일한 역할을 하는
// event 관련 메서드들이 내장되어 있다.

// 이 wrapper를 SyntheticEvent인 허브라고 하는데, 각각의 이벤트드들은 독립적인  SyntheticEvent에 감싸져 있다.
// 그래서 이벤트가 발생하면 각각의 독립적인 wrapper에서 이벤트 흐름이 발생하는데,
// 이를 e.preventEvent()를 해서 기존 이벤트를 막는다던지, e.stopPropagation() 을 호출하여, 이벤트 흐름을 더이상 올라가지 않도록
// 제어할 수 있다.

// 하지만 이벤트와 관련해서 e.preventEvent()로도 제어하지 못하는 상황이 생긴다
// SyntheticEvent가 서로 다른 event가 각각 큐에 담기게 되고
// 이는 동일한 SyntheticEvent 내 event 제어에 대해서만 서로 제어가 가능하기 때문에, 제어를 놓치는 순간들이 있다.( 매우 특수한 경우일듯 )

// 위와 같은 상황에서 event 제어에 대해 native event를 제어할 수 있도록
// wrapper에서 제공하고 있기 때문에, 해결을 할수 있다.
class EventHandle extends PureComponent {
    state = {
        counter: 0,
        // 자룟구조를 복잡하게 두지는 마라!!
        array: []
    };

    onClick = () => {
        // 아래와 같이 하고 setState() 하면 감지 하지 못함
        //this.state.array.push(1);

        // 아래와 같이 해줘야한다.
        this.setState({
            array: [...this.state.array, 1]
        })
    }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>click</button>
            </div>
        )
    }
}