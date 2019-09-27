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
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetchSettings: ({ commit }) => {
      SysconfService.getSettings()
        .then(
          res => {
            const loginEnabled = res.data.loginEnabled
            const registerEnabled = res.data.registerEnabled
            commit('FETCH_SETTINGS_SUCCESS', { loginEnabled, registerEnabled })
          },
          err => {
            commit('FETCH_SETTINGS_FAILURE', err.message)
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
