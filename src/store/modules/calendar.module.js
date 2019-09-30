import Vue from 'vue'
import CalendarService from '../../services/calendar.service'

const calendarModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    courses: [],
    fetchedWeeks: [],
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    FETCH_REQUEST: (state) => {
      state.status = { isLoading: true }
    },

    FETCH_SUCCESS: (state, { currentWeek, weekCourses }) => {
      weekCourses.forEach(course => {
        state.courses.push(course) // [...arr]
      })
      state.fetchedWeeks.push(currentWeek)
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
    fetchDate: ({ state, commit, rootState }, { date }) => {
      // get week { year, number } of the date to fetch
      const currentWeek = getWeekNumber(new Date('20' + date.split('-')[2] + '-' + date.substr(0, 5) + 'T00:00:00.000Z'))

      // if that week hasn't already been fetched
      if (!state.fetchedWeeks.some(week => week.year === currentWeek.year && week.number === currentWeek.number)) {
        if (process.env.NODE_ENV === 'development') console.log(`Year ${currentWeek.year}, week ${currentWeek.number}: FETCHING`)
        commit('FETCH_REQUEST')
        CalendarService.getWeek(rootState.account.user.email, date)
          .then(
            res => {
              const weekCourses = reformatWeek(res.week)
              commit('FETCH_SUCCESS', { currentWeek, weekCourses })
            },
            err => {
              commit('FETCH_FAILURE', err.message)
              Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || `Erreur lors du chargement la semaine...`}` })
            })
      } else {
        if (process.env.NODE_ENV === 'development') console.log(`Year ${currentWeek.year}, week ${currentWeek.number}: ALREADY FETCHED`)
      }
    }
  },
  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoading: state => {
      return !!state.status.isLoading
    },
    getCourses: state => {
      return state.courses
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
        start: formatDate(course.date, course.start),
        end: formatDate(course.date, course.end),
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
  const timeSplit = time.split(':')
  return new Date(temp[2], temp[1] - 1, temp[0], timeSplit[0], timeSplit[1])
}

const getWeekNumber = (date) => {
  // Copy date so don't modify original
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))
  // Get first day of year
  var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
  // Return array of year and week number

  // return [date.getUTCFullYear(), weekNo]
  return { year: date.getUTCFullYear(), number: weekNo }
}

export default calendarModule
