<template>
  <div class="container">
    <Header />
    <div class="center">
      <h1>Vuex 커플 취미매칭 예제 만들어보기</h1>

      <hr>
      <h2>시작 방법</h2>
      <section class="section install">
        <p>
          node가 설치 되어 있는지 먼저 확인해 주세요.
        </p>
        <div class="pannel">
          <p>npm i .</p>
          <p>npm run start</p>
        </div>
      </section>

      <hr>
      <h2>주요 구현</h2>
      <section class="section implement">
        <h4>확장성, 유지보수 고려</h4>
        <ul>
          <li>Vue를 활용한 컴포넌트 설계</li>
          <li>Vuex를 활용한 전역 상태관리</li>
          <li>view - component - store - service 로 관심사 분리</li>
          <li>Router 구현</li>
        </ul>

        <h4>네트워크 호출 최소화</h4>
        <ul>
          <li>CoupleList에서 컴포넌트가 reflash 되는 경우에만 api 재호출을 하게 되어있음</li>
          <li>실제 데이터와 보여지는 데이터를 나누어 필터링을 통해 관리함, 고로 불필요한 api 호출을 최소화</li>
        </ul>

        <h4>에러 처리</h4>
        <ul>
          <li>네트워크 장애, API 에러 등등을 대비해놓음</li>
          <li>사용자에게도 경고알림 메시지로 띄워줌</li>
        </ul>

        <h4>빌드 구성</h4>
        <ul>
          <li>웹팩 처음부터 구축해서 필요한 셋팅들만 구현됨</li>
          <li>output을 통해 압축본을 <strong>dist</strong> 로 위치시킴</li>
          <li>vue, eslint, bootstrap 셋팅함</li>
        </ul>

        <h4>매칭 알고리즘</h4>
        <ul>
          <li>O(10 * N^2) 의 시간 복잡도를 가짐</li>
          <li>취미 목록 (예시) ABDFGHITYZ의 위치별 존재 유무를 체크하는 cache list를 만들어서 활용함</li>
        </ul>
        <div class="pannel">
          <p>A    | B    | C     | D    | E     | ... | Z    |</p>
          <p>true | true | false | true | false | ... | true |</p>
        </div>

        <h4>디자인</h4>
        <ul>
          <li>부트스트랩 활용</li>
          <li>기본적인 레이아웃만 CSS 작성</li>
        </ul>

        <h4>테스트 코드</h4>
        <ul>
          <li>webpack-mocha 와 vue/test-utils 을 셋팅해놓음</li>
          <li>webpack-mocha 1v은 내부적으로 이슈가 있어서, 2v로 교체함</li>
          <li>테스트 코드 작성까지는.. 못함</li>
        </ul>
      </section>

      <hr>
      <h2>구현의 한계점</h2>
      <section class="section limit">
        <h4>매칭 알고리즘</h4>
        <ul>
          <li>10000개 요청 후 매칭 시 30~40초정도나 걸린다. 더 줄일순 없을까? ㅠㅠ</li>
          <li>10000개 요청 후 매칭 시 CPU 자원을 많이 잡아먹는다.</li>
          <li>Memorization으로 효율성을 높여야 하나?.. 해서 고민을 계속 해봤지만, 좋은 대안이 떠오르지 않는다 ㅠ</li>
        </ul>

        <h4>테스트 코드</h4>
        <ul>
          <li>- 테스트 코드 작성까지는 수행하지 못했다..</li>
        </ul>
        <h4>시간 분배</h4>
        <ul>
          <li>- webpack을 처음부터 구성을 하다보니, 매번 webpack 추가 설정에서 시간을 잡아먹었다.</li>
        </ul>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './../components/common/Header'
import Footer from './../components/common/Footer'

export default {
    name: 'About',
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped>
    .center {
        font-size: 18px;
        position: relative;
        margin-bottom: 5em;
    }
    .section {
      padding: 1em 3em
    }
    .pannel {
      background-color: #eee;
      width: 100%;
      padding: 10px 50px;
    }
    h4 {
      margin-top: 1em;
    }
</style>