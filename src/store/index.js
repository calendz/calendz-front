import Vue from 'vue'
import Vuex from 'vuex'
import AccountModule from './modules/account.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: AccountModule
  },
  strict: process.env.NODE_ENV !== 'production'
})
