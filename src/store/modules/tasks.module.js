import Vue from 'vue'
import TaskService from '../../services/task.service'

const tasksModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    tasks: [],
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    FETCH_ALL_REQUEST: (state) => {
      state.status = { isRetrieving: true }
    },
    FETCH_ALL_SUCCESS: (state, tasks) => {
      state.tasks = tasks
      state.status = {}
    },
    FETCH_ALL_FAILURE: (state, reason) => {
      state.status = { error: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetchAll: ({ commit, rootState }) => {
      commit('FETCH_ALL_REQUEST')
      TaskService.getAllFrom(rootState.account.user._id)
        .then(
          res => {
            commit('FETCH_ALL_SUCCESS', res.tasks)
          },
          err => {
            commit('FETCH_ALL_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    getAll: state => {
      return state.tasks || []
    }
  }
}

export default tasksModule
