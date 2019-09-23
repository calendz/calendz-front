// import Vue from 'vue'
// import swal from 'sweetalert2'
// import router from '../../routes/router'
import CalendarService from '../../services/calendar.service'
// import ApiService from '../../services/api.service'

const calendarModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    week: {},
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    FETCH_REQUEST: (state) => {
      state.status = { isLoading: true }
    },

    FETCH_SUCCESS: (state, week) => {
      state.week = week
      state.status = {}
    },

    FETCH_FAILURE: (state, reason) => {
      state.status = { error: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetch: ({ commit, rootState }) => {
      commit('FETCH_REQUEST')
      CalendarService.getCurrentWeek(rootState.account.user.email)
        .then(
          res => {
            commit('FETCH_SUCCESS', res.week)
          },
          err => {
            commit('FETCH_FAILURE', err.message)
          })
    }
  },
  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoading: state => {
      return !!state.status.isLoading
    }
  }
}

export default calendarModule
