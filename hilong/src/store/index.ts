import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'
// modules

Vue.use(Vuex)

const store:Store<any> = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store