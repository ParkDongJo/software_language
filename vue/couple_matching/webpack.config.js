const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require("vue-loader/lib/plugin");

/*
[ Browserify ]
Browserify는 서버사이드 환경에서 사용되는 CommonJS 형식의 require('modules') 코드를 사용하여 의존성 관리를 할 수 있을 뿐만 아니라,
클라이언트 사이드 환경에서도 사용할 수 있도록 한데 묶어주는(Bundle) 유용한 툴입니다. 즉, Node.js와 같은 형식을 웹 브라우저에서도 동일하게 사용할 수 있습니다.
*/

/**
  웹팩!!
  웹팩은 모든 파일을 모듈로 접근한다. js, css, json, xml 등등 다양한 파일의 의존도를 파악하고 이를 하나의 bundle.js 파일로 만들어준다.
  이러한 빌드, 배포와 관련된 라이브러리가 gulp와 grunt가 있으나, webpack은 이에 대해 더 다양한 기능들을 지원한다.

  웹팩을 비교하는 글들은 대부분 glup + browerify Vs. webpack 형태로 많이 비교한다. glup는 테스크 러너라면 웹팩은 번들러이기 때문에,
  엔트리를 시작으로 명시된 require() 구문을 해석하여 의존성을 관리할 수 있다. 웹팩은 이를 하나의 bundler로 제공해 주는데, 각각 옵션에 따라
  이 번들러를 간편하게 용량, 디버그, 번들 성능 등등을 조절 할 수 있다.

  이는 사실 glup와 grunt 보다 웹팩을 더 선호하게 되는 주요 요인들이라고 생각한다.
  웹팩을 알다보면, hot-loader/ dev-server 등등 개발환경을 위한 편리한 기능들이 있으며,
  심지어 babel-loader를 연동하여 내가 지원하고자 하는 브라우저를 설정하면
  해당 브라우저에서 지원하는 es 규격을 자동으로 맞춰서 bundle.js를 생성해 준다. 오마이갓!!!

  또한 한번의 웹팩 설정으로 실서버 배포 빌드와 개발환경 빌드를 따로 관리 할수도 있다.

  webpack-dev-server --config webpack.config.dev.js
  webpack --config webpack.config.prod.js

  개발환경은 디버그 및 빌드 성능을 중점적으로 설정하는 것이 좋으며
  실제환경은 압축 및 빌드의 꼼꼼함 등을 중점으로 설정하는게 좋다
  이는 mode와 devtool을 통해 설정할 수 있다.
 */
module.exports = {
  name: 'couple_matching_conf',
  mode: 'development', // 실서비스 : produxtion

  /*
    웹팩 공식홈페이지에 보면 13개의 설정 옵션들이 있다.
    build, rebuild, bundle quility 등으로 설정을 조절할 수 있는데,
    퀄리티는 떨어지도라도 build와 rebuild 성능이 좋은 eval로 선택
    빠르게 빠르게 개발하고, 디버깅 하고 해야하니까

    하지만 실서버 셋팅이라면 압축률과 꼼꼼한 번들을 기준으로 선택
  */
  devtool: 'eval',  // 빠르게 + produxtion 아님

  /*
    resolve 같은 경우 alias라던지,
    extensions로 확장자를 미리 등록해두는 역할로 사용할 수 있음
    또는 moudles 을 미리 등록할 수 있다.
  */
  resolve: {
    modules: ['node_modules'],  // 생략가능
    extensions: ['*', '.js', '.vue', '.json']
  },

  /*
    웹팩은 의존성을 관리를 통해 최종적으로 bundle.js 파일을 만들어주는데,
    entry는 이 번들링을 하게되는 시작점이라고 생각하면 된다.
    아래에 등록된 entry를 기점으로 require() 구문을 통해 각 모듈의 의존도를
    파악하기 시작한다.
  */
  entry: {
    app: ['./src/index']
  },  // 입력

  /*
    웹팩은 모든 파일을 모듈로 관리한다고 했다. 자바스크립트 파일 뿐만 아니라 이미지, 폰트, 스타일시트도 전부 모듈로 관리한다.
    그러나 웹팩은 자바스크립트 밖에 모른다. 비 자바스크립트 파일을 웹팩이 이해하게끔 변경해야하는데 로더가 그런 역할을 한다.

    로더는 test와 use키로 구성된 객체로 설정할 수 있다.
    - test에 로딩할 파일을 지정하고
    - use에 적용할 로더를 설정한다

    여기서 style-loader 와 vue-loader, babel-loader를 설정한다.
  */
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.css/, use: ['vue-style-loader', 'css-loader'] },
      {
        enforce: 'pre', // enfoce: "pre"로 해서 다른 로더들보다 먼저 실행하게 한다.
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,  // exclude 속성은 eslint 검사시 제외 할 디렉토리나 모듈을 설정한다.
        options: {
          fix: true
        }
      }
    ]
  },

  // 개발환경 로컬 서버에 대한 셋팅이다.
  devServer: { 
    open: true, // dev-server 빌드 후 브라우저를 올려준다.
    hot: true // 변경에 대한 즉각적인 반영을 해주는 hot-loader 옵션
  },

  /*
    만약 웹팩의 기본적인 기능 외적으로 다양한 기능들을 사용하고 싶다면
    아래의 plugin에 해당 플러그 인을 셋팅하면 된다.

    예를 들어 UglifyJsPlugin() 플러인 같은 경우 압축을 해준다.
    또한 여기서는 Vue를 사용하기 때문에, Vue 문법을 지원하는 VueLoaderPlugin()를 셋팅했다.
  */
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  
  /*
    번들링을 완료후 결과물 bundle.js를 둘 위치를 셋팅한다.
    또는 그와 관련된 여러 셋팅 옵션들이 있다.
    이걸.. 다 알진 못하겠다 너무 많다.
  */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  }
};

// 웹팩
// https://webpack.js.org
// http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html
// https://firejune.com/1798/%EC%B4%88%EB%B3%B4%EC%9E%90%EC%9A%A9+Webpack+%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC+%ED%8C%8C%ED%8A%B81+-+Webpack+%EC%9E%85%EB%AC%B8
// https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/#devtool

// 바벨 로더
// https://github.com/webpack-contrib/eslint-loader