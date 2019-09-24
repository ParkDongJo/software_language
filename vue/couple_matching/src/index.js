import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import ApiService from './services/api.service'
import CONST from "./constants";


ApiService.init(CONST.BASE_API_URL)

Vue.use(BootstrapVue)
// Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
