<template>
  <div id="couple-list">
    <div class="pannel clear-fix">
      <span class="total float-left">Total : {{ len }}</span>
      <Selector class="selector float-right" />
    </div>
    <div>
      <b-table
        :items="couples"
        :fields="fields"
        :tbody-tr-class="rowClass"
      />
    </div>
    <b-alert
      v-if="errMsg !== ''"
      show
    >
      {{ errMsg }}
    </b-alert>
  </div>
</template>
<script>
import Selector from './common/Selector'
import { mapGetters, mapActions } from "vuex";
import CONST from './../constants'

/*
  MVVM 모델이기 때문에 상태(데이터)가 바뀌면 ViewModel 객체가 바라보고 있다가 감지하여 UI를 자동으로 변경합니다.
  중요한 상태 데이터가 어느 컴포넌트,어떤 메서드에 의해서 언제 변경되는지를 전혀 알 수 없게 됩니다.

    [ MVVM 패턴 ]
    vue는 mvvm 패턴 일부분을 적용하고 있다. Vue.js 자체가 ViewMode로 볼 수 있다.[아래 링크 참고]
    https://kkodu.tistory.com/4
    
    또한 mvvm, mvp, mvc 패턴에 대해 자세히 설명되어 있는 블로그를 참고하자
    간단하게 설명하면 mvvc 은 view-model 이라는 놈이 있다. 이는 view와 1: N 관계에 있다.
    하지만 이들은 서로의 관계를 모른다. 다만 data-binding이라는 기법으로 view-model이 model의 데이터를 변경시킨다.
    mvc의 controller와 비슷해 보이지만, view와의 의존성이 약하다.
    View 를 위한 View 가 중심이 되는 패턴

    [ 웹 컴포넌트 ]
    웹 컴포넌트 개념이라고 있다. 사실 vue나 react, angular 에서 나오는 component는 원래 존재하는 웹컴포넌트 개념과는 조금 다르다
    오히려 순수 웹컴포넌트의 개념을 도입한 것들은 구글의 polymer, x-Tag, bosonic 등이 있다.

    웹 컴포넌트의 개념 자체는 아래의 링크를 참고하자
    https://developer.mozilla.org/ko/docs/Web/Web_Components

    그리고 웹 컴포넌트가 더 발전해야하는 지도 아래의 링크를 참고하자.
    https://han41858.tistory.com/15

    결론 부터 말하자면, 진정한 웹컴포넌트 개념은 사실 어떤 특정 프레임워크에 종속되지 않으며, 어떤 특정 브라우저에 종속되지 않아야 한다.
    즉 어떠한 환경에서든 커스텀한 컴포넌트를 만들어서 외부의 영향을 받지 않고 재사용성이 가능해야하는 것이다.
    하지만 그런 측면에서 구글의 polymer도 웹컴포넌트 개념에서는 자유롭지 못하다.
    
    내부적으로 구글 크롬에서만 성능이 높게 되도록 설계 했기 때문이다.
    아무래도 척이 각 개별 회사들의 이익추구로 인해 기술 생태계의 발전이 오히려 저하되고 복잡해 지고있다는 통찰력은
    이러한 상황을 두고 이야기 하는 것일것이다..

    척.. 당신은 괴물같은.. 그런걸 언제 다 보고 체크를 미리 한것인지 ㅋㅋㅋ
    나도 열심히 해야지

    [ vue가 mvvm 이면 React는? ]
    vue와 달리 React는 대표 패턴에 딱 맞는 프레임은 아닌듯 하다. 여러 글들을 취합해보면, 우선 React는 View에만 관심있는 라이브러리라고 정의 할수 있다.
    즉 "mvvm 패턴이고 mvp 패턴이고 난 모르겠고!!! react인 나는 View 렌더링을 어떻게 성능을 최적화 하고, 제어하며, 어떻게 추적가능하게 하는지만 관심있어"
    즉 난 view 제어에 효율성을 높이는데만 관심있다!!! 라고 말하는 라이브러리라고 봐야한다.

    즉 어떤 패턴이나 뭐 그런 접근 보다는 그 라이브러리만의 독특한 접근법이 있다는 것이다.
    https://trustyoo86.github.io/react/2017/11/18/what-is-react.html


    [ vue 와 react 비교 ]
    이 내용은 생략하겠다. 결론부터 말하면 큰 규모 앱개발은 React, 적절한 규모 앱개발은 vue 이다. 이유는 아래와 같다
    [vue]
    - vue는 data binding 기반이므로 data더 바인딩을 효율적으로 할 필요가 있다. 안그러면 성능에 영향을 줄수 있다 (물론 버츄얼 돔 어쩌구 하지만..)
    - 템플릿 기반 코드라 가독성이 뛰어나다. 하지만 테스트가 어려울수 있고, 런타임 에러가 발생 할 수 있다.( 물론.. react도 뭐 능숙하지 못하면 마찬가지 인거 같다. )
    - 즉 vue는 가독성과 재활용성이 뛰어나다고 볼 수 있다. 접근하기 쉽다.
    - 취향을 좀 따지자면 객체지향을 상대적으로 더 선호한다면, vue를 추천

    [react]
    - view 렌더링의 최적화에 좀더 디테일 하다, 내부적으로도 그렇고 개발자 스스로 제어하는 부분도 여지가 많다.
    - jest라던지 테스트 도구의 사용이 쉽고, 용이하다. 잘 갖춰져 있다는 말이다.
    - 또한 hooks의 등장으로 함수형 프로그래밍으로 넘어가면서, react의 장점이 더 뚜렷해 지낟.
    - 함수형 프로그래밍을 상대적으로 더 선호한다면, react를 추천
    react dev-tool 소개 ㅎㅎ 블록,,,
    https://medium.com/signal9/redux-개발을-더-편하게-redux-devtools-4e228655ac7d

    하지만 이것도 굳이 결론을 내린것이다. 사실!!! 규모가 크든 작든, 취향의 선택이다. 가볍게 아래 캡틴 판교의 글을 보자
    https://joshua1988.github.io/web_dev/vue-or-react/

*/

export default {
  name: 'CoupleList',
  components: {
    Selector
  },
  data() {
    return {
      fields: ['matched', 'left', 'right']
    }
  },
  /*
    Vue.js의 라이프 사이클은 크게 Creation, Mounting, Updating, Destruction
  */

  // data를 연산 작업 후 바인딩 시킬 때  
  // computed 속성은 종속 대상을 따라 저장(캐싱)된다는 것
  // computed 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행합니다.
  // 여러 번 요청해도 계산을 다시 하지 않고 계산되어 있던 결과를 즉시 반환합니다.

  // 계산해야 하는 목표 데이터를 정의하는 방식으로 소프트웨어 공학에서 이야기하는 ‘선언형 프로그래밍’ 방식
  // get(), set()을 설정할 수 있음.
  computed: mapGetters('couple', [
      'couples',
      'len',
      'errMsg',
  ]),
  // 그 데이터가 바뀌면 이런 함수를 실행하라는 방식
  // ‘명령형 프로그래밍’ 방식.
  // 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용합니다
  // watch 옵션을 사용하면 비동기 연산 (API 엑세스)를 수행하고, 
  //우리가 그 연산을 얼마나 자주 수행하는지 제한하고, 최종 응답을 얻을 때까지 중간 상태를 설정할 수 있습니다.
  watch() {},
  // [ 생명주기 ]
  // https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4
  
  // 공식홈페이지에 보면 lodash와 함께 watch()에서 api 비동기 처리를 하는것을
  // 예제로 보여주고 있다.
  // lodash 라는 걸 모르고 있었는데, 꽤나 코드가 깔끔하게 정리되는걸 보고
  // 일단 호기심이 생겨서 공식홈페이지를 들어 가봤다.
  // https://lodash.com/docs#debounce
  beforeCreate() {
    // 가장 먼저 실행되는 훅
    // 아직 data와 events(vm.$on, vm.$once, vm.$off, vm.$emit)가 세팅되지 않은 시점
  },
  created() {
    // data와 events가 활성화되어 접근할 수 있다.
    // 여전히 템플릿과 가상돔은 마운트 및 렌더링되지 않은 상태이다.
      this.$store.dispatch('couple/initCouples', { size: CONST.API_REQUEST_SIZE })
  },
  beforeMount() {
    // 템플릿과 렌더 함수들이 컴파일된 후에 첫 렌더링이 일어나기 직전에 실행된다.
    // 대부분의 경우에 사용하지 않는 것이 좋다.
  },
  mounted() {
    // mounted 훅에서는 컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있다.
    // 서버렌더링에서는 호출되지 않는다.

    // 부모와 자식 관계의 컴포넌트에서 우리가 생각한 순서로 mounted가 발생하지 않는다는 점이다. 
    // 부모의 mounted훅이 자식의 mounted훅보다 먼저 실행되지 않는다. 오히려 그 반대이다.
    // 부모 created -> 자식 컴포넌트 생성 -> 자식 created -> 자식 mounted -> 부모 mounted
  },
  beforeUpdate() {
    // 컴포넌트의 데이터가 변하여 업데이트 사이클이 시작될때 실행된다
    // 정확히는 돔이 재 렌더링되고 패치되기 직전에 실행된다.
  },
  updated() {
    // 컴포넌트의 데이터가 변하여 재 렌더링이 일어나 후에 실행된다.
    // 돔이 업데이트 완료된 상태이므로 돔 종속적인 연산을 할 수 있다.

    // 여기서 상태를 변경하면 무한루프에 빠질 수 있다.
    // 모든 자식 컴포넌트의 재 렌더링 상태를 보장하지는 않는다.
  },
  beforeDestroy() {
    // 이 훅은 해체(뷰 인스턴스 제거)되기 직전에 호출된다.
    // 이벤트 리스너를 제거하거나 reactive subscription을 제거하고자 한다면 이 훅이 제격이다. 
  },
  destroyed() {
    // 해체(뷰 인스턴스 제거)된 후에 호출된다.
    // 모든 이벤트 리스너가 제거되며 모든 하위 Vue 인스턴스도 삭제된다.
    // 서버 렌더링시 호출되지 않는다.
  },
  // 메소드를 호출하면 렌더링을 다시 할 때마다 항상 함수를 실행합니다.
  // 메소드를 호출하면 렌더링을 다시 할 때마다 항상 함수를 실행
  // 캐시 메커니즘을 사용하지 않는다.
  methods: {
    rowClass(item, type) {
      if (!item) return
      if (item.status === 'awesome') return 'table-success'
    }
  },

}
</script>
<style scoped>
    .pannel {
       padding: 0 2%;
    }
    .total {
        line-height: 38px;
        vertical-align: middle;
        display: inline-block;
    }
    .selector {
        line-height: 38px;
        vertical-align: middle;
    }
    .float-left {
        float: left;
    }
    .float-right {
        float: right;
    }
    .clear-fix::after {
        content: "";
        clear: both;
        display: table;
    }
</style>