import Vue from 'vue'
import SysconfService from '@/services/sysconf.service'

const sysconfModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    status: {},
    settings: {
      loginEnabled: true,
      registerEnabled: true
    }
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    FETCH_SETTINGS_REQUEST: (state) => {
      state.status = { isLoading: true }
    },

    FETCH_SETTINGS_SUCCESS: (state, { loginEnabled, registerEnabled }) => {
      state.settings = { loginEnabled, registerEnabled }
      state.status = {}
    },

    FETCH_SETTINGS_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    TOGGLE_LOGIN_REQUEST: (state) => {
      state.status = { isUpdatingLogin: true }
    },

    TOGGLE_LOGIN_SUCCESS: (state, value) => {
      state.status = { isUpdatingLogin: false }
      state.settings.loginEnabled = value
    },

    TOGGLE_LOGIN_FAILURE: (state, reason) => {
      state.status = { toggleLoginError: reason }
    },

    TOGGLE_REGISTER_REQUEST: (state, value) => {
      state.status = { isUpdatingRegister: true }
      state.settings.registerEnabled = value
    },

    TOGGLE_REGISTER_SUCCESS: (state) => {
      state.status = { isUpdatingRegister: false }
    },

    TOGGLE_REGISTER_FAILURE: (state, reason) => {
      state.status = { toggleRegisterError: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetchSettings: ({ commit }) => {
      commit('FETCH_SETTINGS_REQUEST')
      SysconfService.getSettings()
        .then(
          res => {
            const loginEnabled = res.data.loginEnabled || false
            const registerEnabled = res.data.registerEnabled || false
            commit('FETCH_SETTINGS_SUCCESS', { loginEnabled, registerEnabled })
          },
          err => {
            commit('FETCH_SETTINGS_FAILURE', err.message)
          })
    },
    toggleLogin: ({ commit }, { value }) => {
      commit('TOGGLE_LOGIN_REQUEST')
      SysconfService.toggleLogin(value)
        .then(
          res => {
            const message = value
              ? 'Les utilisateurs peuvent désormais se connecter !'
              : 'Les utilisateurs ne peuvent désormais plus se connecter !'
            const type = value
              ? 'success'
              : 'warning'
            Vue.prototype.$notify({ type, timeout: 10000, message })
            commit('TOGGLE_LOGIN_SUCCESS', value)
          },
          err => {
            Vue.prototype.$notify({ type: 'danger', timeout: 10000, message: `<b>Erreur !</b> ${err.message}` })
            commit('TOGGLE_LOGIN_FAILURE', err.message)
          })
    },
    toggleRegister: ({ commit }, { value }) => {
      commit('TOGGLE_REGISTER_REQUEST')
      SysconfService.toggleRegister(value)
        .then(
          res => {
            const message = value
              ? `Les utilisateurs peuvent désormais s'inscrire !`
              : `Les utilisateurs ne peuvent désormais plus s'inscrire !`
            const type = value
              ? 'success'
              : 'warning'
            Vue.prototype.$notify({ type, timeout: 10000, message })
            commit('TOGGLE_REGISTER_SUCCESS', value)
          },
          err => {
            Vue.prototype.$notify({ type: 'danger', timeout: 10000, message: `<b>Erreur !</b> ${err.message}` })
            commit('TOGGLE_REGISTER_FAILURE', err.message)
          })
    }
  },
  // ==================================
  // == Getters
  // ==================================
  getters: {
    getSettings: state => {
      return state.settings
    }
  }
}

export default sysconfModule
