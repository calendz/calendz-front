import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: UserModule
  },
  strict: process.env.NODE_ENV !== 'production'
})
