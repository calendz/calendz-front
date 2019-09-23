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
    },
    getWeek: state => {
      const week = reformatWeek(state.week)
      return week
    }
  }
}

const reformatWeek = (week) => {
  const customCourses = []

  // for each day of the week
  for (let [, courses] of Object.entries(week)) {
    // for each course of the day
    courses.forEach((course) => {
      customCourses.push({
        title: course.subject,
        start: new Date(formatDate(course.date, course.start)),
        end: new Date(formatDate(course.date, course.end)),
        className: 'bg-default',
        professor: course.professor,
        room: course.room
      })
    })
  }

  return customCourses
}

const formatDate = (date, time) => {
  const temp = date.split('/')
  return `${temp[2]}-${temp[1]}-${temp[0]}T${time}:00`
}

export default calendarModule
