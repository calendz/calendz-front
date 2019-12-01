import Vue from 'vue'
import SysconfService from '@/services/sysconf.service'

const sysconfModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    status: {},
    stats: {},
    settings: {
      loginEnabled: true,
      registerEnabled: true
    }
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    RESET: (state) => {
      state.status = {}
      state.stats = {}
      state.settings = {
        loginEnabled: true,
        registerEnabled: true
      }
    },

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

    FETCH_STATS_REQUEST: (state) => {
      state.status = { isLoadingStats: true }
    },
    FETCH_STATS_SUCCESS: (state, stats) => {
      state.stats = stats
      state.status = {}
    },
    FETCH_STATS_FAILURE: (state, reason) => {
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

    TOGGLE_REGISTER_REQUEST: (state) => {
      state.status = { isUpdatingRegister: true }
    },
    TOGGLE_REGISTER_SUCCESS: (state, value) => {
      state.status = { isUpdatingRegister: false }
      state.settings.registerEnabled = value
    },
    TOGGLE_REGISTER_FAILURE: (state, reason) => {
      state.status = { toggleRegisterError: reason }
    },

    DISCONNECT_USERS_REQUEST: (state) => {
      state.status = { isDisconnecting: true }
    },
    DISCONNECT_USERS_SUCCESS: (state) => {
      state.status = { isDisconnecting: false }
    },
    DISCONNECT_USERS_FAILURE: (state, reason) => {
      state.status = { disconnectUsersError: reason }
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
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b>Une erreur est survenue, veuillez réessayer...` })
          })
    },
    fetchStats: ({ commit }) => {
      commit('FETCH_STATS_REQUEST')
      SysconfService.getStats()
        .then(
          res => {
            commit('FETCH_STATS_SUCCESS', res.data.stats)
          },
          err => {
            commit('FETCH_STATS_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
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
            commit('TOGGLE_LOGIN_SUCCESS', value)
            Vue.prototype.$notify({ type, message })
          },
          err => {
            commit('TOGGLE_LOGIN_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Une erreur est survenue...'}` })
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
            commit('TOGGLE_REGISTER_SUCCESS', value)
            Vue.prototype.$notify({ type, message })
          },
          err => {
            commit('TOGGLE_REGISTER_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Une erreur est survenue...'}` })
          })
    },
    disconnectAllUsers: ({ commit }) => {
      commit('DISCONNECT_USERS_REQUEST')
      SysconfService.disconnectAllUsers()
        .then(
          res => {
            commit('DISCONNECT_USERS_SUCCESS')
            Vue.prototype.$notify({ type: 'success', message: `Les utilisateurs ont bien été déconnectés.` })
          },
          err => {
            commit('DISCONNECT_USERS_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Une erreur est survenue...'}` })
          })
    }
  },
  // ==================================
  // == Getters
  // ==================================
  getters: {
    getSettings: state => {
      return state.settings
    },
    getUsersStats: state => {
      return state.stats ? state.stats.users ? state.stats.users : {} : {}
    },
    getTasksStats: state => {
      return state.stats ? state.stats.tasks ? state.stats.tasks : {} : {}
    }
  }
}

export default sysconfModule
