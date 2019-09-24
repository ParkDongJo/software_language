const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
  name: 'couple_matching_conf',
  mode: 'development', // 실서비스 : produxtion
  devtool: 'eval',  // 빠르게 + produxtion 아님
  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },

  entry: {
    app: ['./src/index']
  },  // 입력

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.css/, use: ['vue-style-loader', 'css-loader'] },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true
        }
      }
    ]
  },

  devServer: { 
    open: true,
    hot: true
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  }
};