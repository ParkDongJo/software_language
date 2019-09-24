// node에서 경로를 쉽게 접근할 수 있도록 path라는걸 지원해줌
const path = require('path')
const webpack = require('webpack')

module.exports = {
  name: 'react_tdd',
  mode: 'development', // 실서비스 : produxtion
  devtool: 'eval',  // eval 빠르게
  resolve: {
    extensions: ['.js', '.jsx'] // 확장자 등록
  },

  entry: {
    app: ['./client']
  },  // 입력

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR','last 2 chrome versions'], // browserslist 를 참고하여 지원 브라우저를 지목해주는게 좋다.
            },
            debug: true,
          }], 
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-hot-loader/babel'
        ]
      },
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /(node_modules)/
    }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true })
  ],// 확장프로그램

  output: {
    // __dirname = 현재 폴더 경로
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/', // 노드의 app.use('/dist',express.static(__dirname, 'dist') 와 비슷하다
  },  // 출력
}

