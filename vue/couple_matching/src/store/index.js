import Vue from 'vue'
import Vuex from 'vuex'
import couple from './couple'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    couple: couple,
  }
})