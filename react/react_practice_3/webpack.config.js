// node에서 경로를 쉽게 접근할 수 있도록 path라는걸 지원해줌
const path = require('path')

module.exports = {
  name: 'word-relay-conf',
  node: 'development', // 실서비스 : produxtion
  devtool: 'eval',  // eval 빠르게
  resolve: {
    extentions: ['.js', '.jsx'] // 확장자 등록
  },

  entry: {
    app: ['./client']
  },  // 입력
  output: {
    // __dirname = 현재 폴더 경로
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },  // 출력
}
