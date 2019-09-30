import { CoupleService, CoupleApiError } from '../services/couple.service'
import CONST from "./../constants";


/*
    전역 store 같은 경우 vue에서는 몇가지 대안들이 있어보인다.
    ( react 같은 경우는 context api 또는 redux(mobx) 패턴으로 간추릴수 있다. )

    1. 공홈에서 이야기 하는 store 패턴
    아래와 같이 Vue 생성시 data 속성에 공용으로 사용될 state를 미리 등록해두는 것이다.
    간단한 앱에서는 사용하기 간편하고, 딱히 설정이나 boilerplat code가 필요 없기 때문엔
    규모가 작은 앱에서 간편하게 쓸수 있는 패턴이다.
    https://kr.vuejs.org/v2/guide/state-management.html

    var vmA = new Vue({
        data: {
            privateState: {},
            sharedState: store.state
        }
    })

    2. EventBus를 활용하는 기법
    Vue에는 EventBus라는 객체가 존재한다. 여기서 메서드를 작성하고 해당 메서드를 모든 컴포넌트에서 사용할 수 있다.
    과거에 비해 우리는 데이터 생성, 발행, 구독 등등의 프로세스 개념들을 많이 듣게 되었다.
    http://vuejs.kr/jekyll/update/2017/02/13/vuejs-eventbus/

    해당 EventBus도 이벤트를 통해서 상태를 전역에서 관리하는 기법이다

        // 이벤트버스 생성
        var EventBus = new Vue()
        // 이벤트 발행
        EventBus.$emit('message', 'hello world');
        // 이벤트 구독
        EventBus.$on('message', function(text) {
            console.log(text);
        });
    
    위와 같이 $on() 과 $emit() 을 통해서 특정 이벤트가 변경되거나 하면, 그에 따른 이벤트를
    구독이 등록되어 있는 컴포넌트에게 데이터를 전달하는 방식이다.

    하지만 이와 같은 방법도 데이터를 가공하거나 다양한 작업들을 작성하기는 힘들다.
    단지 이벤트를 발행하고 왓칭 하는 것 밖에 하지 않는다. 그렇기 때문에 이것도 작은 규모의 앱에서 사용이 적합하지
    큰 규모의 앱에서는 사용하기 적절하지 않다.


    3. Vuex 라는 상태관리 매니저를 활용
    드디어!! 핵심까지 왔다. React를 하다보면 Redux는 가장 많이 접하게 되는 패턴이다. 여기서 Vuex는 Redux와
    비슷한 부분이 많다.

    Vuex를 통한 전역 상태의 매니징에 대한 욕구는 아래와 같다
    - 중앙 집중화된 상태 정보 관리가 필요하다.
    - 상태 정보가 변경되는 상황과 시간을 추적하고 싶다.
    - 컴포넌트에서 상태 정보를 안전하게 접근하고 싶다.
*/


const state = {
    // list structure - 
    // [ {'matched': ..., 'left': ...,'right': ...,'matchedStr': ...,'matchedCnt': ... } ]
    realList: [],
    displayList: [],
    selected: 'ALL',
    isLoading: false,
    errMsg: ''
}

/*
    mutations - 상태변이 담당

    상태 변이에 대해서만 담당한다. mutation 의 메서드 명을 상수로 관리하는 것도 좋은 방법인것 같다.
    [Constant.ADD_TODO] : () => { } 이런 식으로 작성할 수 있다.

    mutaions은 action에서 commit() 을 받아서 갱신된다. 행여나 mutaion을 외부에서 참조해서 쓰려는 시도가 있겠으나
    이는 잘못된 접근 방법이다.
    중요한 점은 mutaion의 상태변이는 동기적으로 작동한다. 풀어서 쓰면 상태변경이 일어나면 동기적으로 변경된다.
    그런데 이렇게 하는 이유는 mutaion은 상태 변경에 대한 추적이 가능하도록 하기 위함이다. 이렇게 해야하만
    상태가 변경 되었을 시 시간별 추적이 가능하고, 동기화된 상태 추적이 가능하기 때문이다.
 */
const mutations = {
    setRealList: (state, couples) => {
        state.realList = couples;
        // state.errMsg = ''
    },
    setDisPlayList: (state, displayList) => {
        state.displayList = displayList
        // state.errMsg = ''
    },
    setSelected: (state, selected) => {
        state.selected = !!selected ? 'ALL' : selected;
        state.displayList = selected === 'ALL' ?
                            state.realList :
                            state.realList.filter((couple) => couple.matchedStr.includes(selected))
        // state.errMsg = ''
    },
    loading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setErrMsg(state, obj) {
        state.errMsg = obj.code + " | " + obj.message
    },
    /*
        아래의 mutations은 굳이 있을 필요가 없는것 같다. 처음에는 setErrMsg()를 사용하기엔 의미상 부족한 면이 있다고 생각해서
        작성 했지만, 생각해보니 이러면 불필요한 코드 양산인 것 같다. 차라리 ErrMsg 를 다시 셋팅해야하는 영역에 errMsg를 초기화 해주는 코드를
        넣어주는 것이 더 좋은것 같다. 라고 생각했지만,

        실제로 해보니까, 따로 두는것이 좋은것 같다!!
        보니까 이걸 하지 않으면 각 mutations을 작성할 때 마다 state.errMsg = ''를 중복 코드를 작성해야한다.
        불필요하다!! 오히려 이렇게 의미를 명확히 하고 재사용성을 높이는 것을 추천한다.
    */
    clearErrMsg(state) {
        state.errMsg = ''
    }
}

/*
    action - 비동기 처리, 외부 API 접근, 외부 호출, 다른 액션호출

    action은 단순하게 보면 mutaion을 접근하기 전단계로 볼수가 있다. 하지만 중요한 건 왜!! 이렇게 구성을 했냐가 중요하다.
    왜! 이렇게 구성했을까? 번거롭게
    그 이유는 action은 특정 역할을 위해 만들어졌다.

    - 비동기 처리
    - 액션의 재사용

    외부 API에 대한 비동기 처리, 또는 다른 액션을 호출 함으로써 코드의 재사용성을 높일 수도 있다.
    인자를 보면 mutation은 인자가 (state, payload) 라면 action의 인자가 (store, payload) 이다.

    여기서 액션은 store를 통해 다른 action을 호출 할수 있다.
    이를 통해 action의 구조를 짜고 코드를 재사용할 수 있다!! 코드의 재사용은 유지보수 능력을 향상시킬 수 있다.

    더 자세한 내용은 아래의 링크를 참고하자! 정말 자세히 잘 작성되었다.
    https://steemit.com/kr/@stepanowon/vuex
 */
const actions = {
    initCouples: async ({ commit, state }, size) => {
        try {
            commit('loading', true);
            const couples = await CoupleService.callApiOfPerHobbies(size);
            commit('setRealList', couples);
            commit('setDisPlayList', couples);
            commit('clearErrMsg');
            commit('loading', false);

        } catch (e) {
            if (e instanceof CoupleApiError) {
                commit('setErrMsg', {code: e.errorCode, message: 'couple API error : ' + e.message})
            } else {
                commit('setErrMsg', {code: CONST.UNKNOWN_ERR_CODE, message: 'unknown error'})
            }
            commit('setDisPlayList', []);
            commit('loading', false);
        }
    }
}

/*
    getter - 데이터 바인딩 전 가공 및 재활용

    getter를 의무적으로 사용할 필요는 없다. 근데 난 왜 getter를 이렇게 사용했을까
    컴포넌트의 코드를 더 깔끔하게 만들고, 컴포넌트의 역할 자체는 View와의 데이터 연동만 담당하는 것이다.

    vue는 mvvc 패턴 일부분을 적용하고 있다. Vue.js 자체가 ViewMode로 볼 수 있다.[아래 링크 참고]
    https://kkodu.tistory.com/4

    그렇다면 이 vue.js 내에서도 component라는 녀석의 역할은 무엇일까.
    큰 의미에서는 view로 봐야하고, 작은 의미에서는 view에 데이터를 바인딩 해주는 view에 관심 많은 module이라고 봐야한다.
    그러면 이 컴포넌트는 어떤 코드들이 들어 있어야 하나!!
    
    - 뷰에 데이터를 바인딩 하는 코드
    - 데이터를 불러오는 코드( 로딩하는.. )
    - 데이터의 변화를 알려주는 코드
    - view event를 감지하는 코드 등등이 들어가야한다.

    즉!! data를 직접적으로 변경한다던지, 삽입하는 코드는 이 컴포넌트에 들어가서는 안된다.
    vuex를 쓴다고 하면 더욱더 그렇게 해야한다.
    개별 state에 대한 코드 변경 및 연산은 들어 갈수 있다 하더라도
    그런 코드 또한 최소화 해야한다. 그래야 역할 분담이 명확해지고 코드의 분리가 명확해 진다.

    그렇기 때문에, 다양한 component에서 재사용 할 수 있고,
    미리 연산된 데이터를 바로 가져다 쓸수 있는 getter를 활용하는 것이 코드 재사용성을 높이는 방법이라고 생각했다.
 */
const getters = {
    couples: (state, getters) => {
        return state.displayList;
    },
    len: (state) => {
        return state.displayList.length;
    },
    isLoading: (state) => {
        return state.isLoading;
    },
    errMsg: (state) => {
        return state.errMsg
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}