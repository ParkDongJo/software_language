module.exports = {
  extends: [
    "plugin:vue/recommended"
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: [
    "vue"
  ],
  "env": {
    "browser": true,
  },
};