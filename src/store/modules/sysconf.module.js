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
      registerEnabled: true,
      editGroupEnabled: false
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
        registerEnabled: true,
        editGroupEnabled: false
      }
    },

    FETCH_SETTINGS_REQUEST: (state) => {
      state.status = { isLoading: true }
    },
    FETCH_SETTINGS_SUCCESS: (state, { loginEnabled, registerEnabled, editGroupEnabled }) => {
      state.settings = { loginEnabled, registerEnabled, editGroupEnabled }
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

    TOGGLE_EDITGROUP_REQUEST: (state) => {
      state.status = { isUpdatingEditGroup: true }
    },
    TOGGLE_EDITGROUP_SUCCESS: (state, value) => {
      state.status = { isUpdatingEditGroup: false }
      state.settings.editGroupEnabled = value
    },
    TOGGLE_EDITGROUP_FAILURE: (state, reason) => {
      state.status = { toggleEditGroupError: reason }
    },

    DISCONNECT_USERS_REQUEST: (state) => {
      state.status = { isDisconnecting: true }
    },
    DISCONNECT_USERS_SUCCESS: (state) => {
      state.status = { isDisconnecting: false }
    },
    DISCONNECT_USERS_FAILURE: (state, reason) => {
      state.status = { disconnectUsersError: reason }
    },

    MIGRATE_USERS_REQUEST: (state) => {
      state.status = { isMigrating: true }
    },
    MIGRATE_USERS_SUCCESS: (state) => {
      state.status = { isMigrating: false }
    },
    MIGRATE_USERS_FAILURE: (state, reason) => {
      state.status = { migrateUsersError: reason }
    },

    SENDMAIL_REQUEST: (state) => {
      state.status = { isSendingMail: true }
    },
    SENDMAIL_SUCCESS: (state) => {
      state.status = { isSendingMail: false }
    },
    SENDMAIL_FAILURE: (state, reason) => {
      state.status = { sendMailError: reason }
    },

    DELETE_ALLGRADES_REQUEST: (state) => {
      state.status = { isDeletingAllGrades: true }
    },
    DELETE_ALLGRADES_SUCCESS: (state) => {
      state.status = { isDeletingAllGrades: false }
    },
    DELETE_ALLGRADES_FAILURE: (state, reason) => {
      state.status = { deleteAllGradeError: reason }
    },

    DELETE_ALLTASKS_REQUEST: (state) => {
      state.status = { isDeletingAllTasks: true }
    },
    DELETE_ALLTASKS_SUCCESS: (state) => {
      state.status = { isDeletingAllTasks: false }
    },
    DELETE_ALLTASKS_FAILURE: (state, reason) => {
      state.status = { deleteAllTasksError: reason }
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
            const editGroupEnabled = res.data.editGroupEnabled || false
            commit('FETCH_SETTINGS_SUCCESS', { loginEnabled, registerEnabled, editGroupEnabled })
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
    toggleEditGroup: ({ commit }, { value }) => {
      commit('TOGGLE_EDITGROUP_REQUEST')
      SysconfService.toggleEditGroup(value)
        .then(
          res => {
            const message = value
              ? 'Les utilisateurs peuvent désormais modifier leur groupe !'
              : 'Les utilisateurs ne peuvent désormais plus modifier leur groupe !'
            const type = value
              ? 'success'
              : 'warning'
            commit('TOGGLE_EDITGROUP_SUCCESS', value)
            Vue.prototype.$notify({ type, message })
          },
          err => {
            commit('TOGGLE_EDITGROUP_FAILURE', err.message)
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
    },
    migrateAllUsers: ({ commit }) => {
      commit('MIGRATE_USERS_REQUEST')
      SysconfService.migrateAllUsers()
        .then(
          res => {
            commit('MIGRATE_USERS_SUCCESS')
            Vue.prototype.$notify({ type: 'success', message: `La migration a bien été effectuée.` })
          },
          err => {
            commit('MIGRATE_USERS_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Une erreur est survenue...'}` })
          })
    },
    sendMail: ({ commit }, { subject, title, content, ctaLabel, ctaUrl }) => {
      commit('SENDMAIL_REQUEST')
      SysconfService.sendMail(subject, title, content, ctaLabel, ctaUrl)
        .then(
          res => {
            commit('SENDMAIL_SUCCESS')
            Vue.prototype.$notify({ type: 'success', message: `Emails envoyés avec succès.` })
          },
          err => {
            commit('SENDMAIL_ERROR', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Une erreur est survenue...'}` })
          })
    },
    deleteAllGrades: ({ commit }) => {
      commit('DELETE_ALLGRADES_REQUEST')
      SysconfService.deleteAllGrades()
      .then(
        res => {
          commit('grades/RESET', {}, { root: true })
          commit('DELETE_ALLGRADES_SUCCESS')
          Vue.prototype.$notify({ type: 'success', message: `Notes supprimées avec succès.` })
        },
        err => {
          commit('DELETE_ALLGRADES_ERROR', err.message)
          Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Une erreur est survenue...'}` })
        })
    },
    deleteAllTasks: ({ commit }) => {
      commit('DELETE_ALLTASKS_REQUEST')
      SysconfService.deleteAllTasks()
      .then(
        res => {
          commit('tasks/RESET', {}, { root: true })
          commit('DELETE_ALLTASKS_SUCCESS')
          Vue.prototype.$notify({ type: 'success', message: `Devoirs/tâches supprimés avec succès.` })
        },
        err => {
          commit('DELETE_ALLTASKS_ERROR', err.message)
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
