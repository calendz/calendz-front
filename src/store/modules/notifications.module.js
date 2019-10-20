import Vue from 'vue'
import swal from 'sweetalert2'
import NotificationService from '../../services/notification.service'

const notificationsModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    notifications: [],
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    NOTIF_REQUEST: (state) => {
      state.status = { isRetrieving: true }
    },

    NOTIF_SUCCESS: (state, notifications) => {
      state.notifications = notifications
      state.status = {}
    },

    NOTIF_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    NOTIF_READ_REQUEST: (state) => {
      state.status = { isReading: true }
    },

    NOTIF_READ_SUCCESS: (state, index) => {
      state.notifications[index].isRead = true
      state.status = {}
    },

    NOTIF_READ_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    NOTIF_READALL_REQUEST: (state) => {
      state.status = { isReading: true }
    },

    NOTIF_READALL_SUCCESS: (state) => {
      state.notifications.forEach(notif => { notif.isRead = true })
      state.status = {}
    },

    NOTIF_READALL_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    NOTIF_UNREAD_REQUEST: (state) => {
      state.status = { isUnreading: true }
    },

    NOTIF_UNREAD_SUCCESS: (state, index) => {
      state.notifications[index].isRead = false
      state.status = {}
    },

    NOTIF_UNREAD_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    NOTIF_CREATE_REQUEST: (state) => {
      state.status = { isCreating: true }
    },

    NOTIF_CREATE_SUCCESS: (state) => {
      state.status = {}
    },

    NOTIF_CREATE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetch: ({ commit, rootState }) => {
      commit('NOTIF_REQUEST')
      NotificationService.getAllFrom(rootState.account.user._id)
        .then(
          res => {
            commit('NOTIF_SUCCESS', res.notifications)
          },
          err => {
            commit('NOTIF_FAILURE', err.message)
          })
    },

    read: ({ commit, state, rootState }, { notifId }) => {
      commit('NOTIF_READ_REQUEST')
      NotificationService.read(rootState.account.user._id, notifId)
        .then(
          res => {
            const index = state.notifications.findIndex(notif => notif._id === notifId)
            commit('NOTIF_READ_SUCCESS', index)
          },
          err => {
            commit('NOTIF_READ_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b>Une erreur est survenue, veuillez réessayer...` })
          })
    },

    readAll: ({ commit, rootState }) => {
      commit('NOTIF_READALL_REQUEST')
      NotificationService.readAll(rootState.account.user._id)
        .then(
          res => {
            commit('NOTIF_READALL_SUCCESS')
          },
          err => {
            commit('NOTIF_READALL_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b>Une erreur est survenue, veuillez réessayer...` })
          })
    },

    unread: ({ commit, state, rootState }, { notifId }) => {
      commit('NOTIF_UNREAD_REQUEST')
      NotificationService.read(rootState.account.user._id, notifId)
        .then(
          res => {
            const index = state.notifications.findIndex(notif => notif._id === notifId)
            commit('NOTIF_UNREAD_SUCCESS', index)
          },
          err => {
            commit('NOTIF_UNREAD_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b>Une erreur est survenue, veuillez réessayer...` })
          })
    },

    create: ({ commit }, { target, title, message, icon, type }) => {
      commit('NOTIF_CREATE_REQUEST')
      NotificationService.create(target, title, message, icon, type)
        .then(
          res => {
            commit('NOTIF_CREATE_SUCCESS')
            swal.fire({
              title: 'Notification créée avec succès',
              type: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          },
          err => {
            commit('NOTIF_CREATE_FAILURE', err.message)
            swal.fire({
              title: 'Une erreur est survenue',
              text: err.message,
              type: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoading: state => {
      return !!state.status.isRetrieving
    },
    all: state => {
      const array = [...state.notifications]
      array.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1)
      return array
    },
    notRead: state => {
      const array = [...state.notifications].filter(notif => notif.isRead === false)
      array.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1)
      return array
    },
    read: state => {
      const array = [...state.notifications].filter(notif => notif.isRead === true)
      array.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1)
      return array
    }
  }
}

export default notificationsModule
