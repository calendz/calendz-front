import Vue from 'vue'
import Vuex from 'vuex'
import { account } from './modules/account.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account
  },
  // TODO: _must_ be false in production
  strict: true
})
