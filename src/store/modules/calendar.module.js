import Vue from 'vue'
import DateUtil from '../../mixins/dateUtilMixin'
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
    RESET: (state) => {
      state.courses = []
      state.fetchedWeeks = []
      state.status = {}
    },

    FETCH_REQUEST: (state, { currentWeek }) => {
      state.fetchedWeeks.push(currentWeek)
      state.status = { isLoading: true }
    },
    FETCH_SUCCESS: (state, { weekCourses }) => {
      weekCourses.forEach(course => state.courses.push(course))
      state.status = {}
    },
    FETCH_FAILURE: (state, { currentWeek, reason }) => {
      state.status = { error: reason }
      state.fetchedWeeks = state.fetchedWeeks.filter(val => {
        return val !== currentWeek
      })
    },

    UPDATE: (state, { weekCourses, weekNumber }) => {
      const before = [...state.courses]
      state.courses = before.filter(course => course.weekNumber !== weekNumber)
      weekCourses.forEach(course => state.courses.push(course))
      state.status = {}
    },

    RESET_FETCHED_WEEKS: (state) => {
      state.fetchedWeeks = []
      state.courses = []
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetchDate: ({ state, commit, rootState }, { date, force = false }) => {
      // get week { year, number } of the date to fetch
      const currentWeek = getWeekNumber(new Date(`20${date.split('-')[2]}-${date.substr(0, 5)}T00:00:00.000Z`))

      // if that week hasn't already been fetched (or if using force)
      if (force || !state.fetchedWeeks.some(week => week.year === currentWeek.year && week.number === currentWeek.number)) {
        if (process.env.NODE_ENV === 'development') console.log(`Year ${currentWeek.year}, week ${currentWeek.number}: FETCHING`)

        const notificationTimestamp = new Date()
        notificationTimestamp.setMilliseconds(notificationTimestamp.getMilliseconds() + Vue.prototype.$notifications.state.length)

        Vue.prototype.$notify({
          type: 'default',
          verticalAlign: 'bottom',
          icon: 'fas fa-circle-notch fa-spin',
          message: 'Chargement de l\'emploi du temps en cours...',
          timeout: 15000,
          timestamp: notificationTimestamp
        })

        const userToFetch = localStorage.getItem('calendz.calendar.searchInput') || rootState.account.user.email
        commit('FETCH_REQUEST', { currentWeek })
        CalendarService.getWeek(userToFetch, date, force)
          .then(
            res => {
              const weekCourses = reformatWeek(res.week, res.weekNumber)
              commit('FETCH_SUCCESS', { weekCourses })
              Vue.prototype.$notifications.removeNotification(notificationTimestamp)

              // if not scrapped today, background actualization
              if (!res.scrappedToday) {
                const notificationTimestamp2 = new Date()
                notificationTimestamp2.setMilliseconds(notificationTimestamp2.getMilliseconds() + Vue.prototype.$notifications.state.length)

                Vue.prototype.$notify({
                  type: 'default',
                  verticalAlign: 'bottom',
                  icon: 'fas fa-circle-notch fa-spin',
                  message: 'Mise à jour de l\'emploi du temps en cours...',
                  timeout: 15000,
                  timestamp: notificationTimestamp2
                })

                CalendarService.updateWeek(userToFetch, date)
                  .then(
                    res2 => {
                      Vue.prototype.$notifications.removeNotification(notificationTimestamp2)
                      if (res2.update) {
                        const weekCourses = reformatWeek(res2.week, res2.weekNumber)
                        commit('UPDATE', { weekCourses, weekNumber: res2.weekNumber })
                        Vue.prototype.$notify({ type: 'success', message: "Votre emploi du temps vient d'être mis-à-jour !", verticalAlign: 'bottom' })
                      }
                    },
                    err2 => {
                      commit('FETCH_FAILURE', { currentWeek, reason: err2.message })
                      Vue.prototype.$notifications.removeNotification(notificationTimestamp)
                      Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err2.message || `Erreur lors du chargement de l'emploi du temps...`}` })
                    })
              }
            },
            err => {
              commit('FETCH_FAILURE', { currentWeek, reason: err.message })
              Vue.prototype.$notifications.removeNotification(notificationTimestamp)
              Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || `Erreur lors du chargement de l'emploi du temps...`}` })
            })
      } else {
        if (process.env.NODE_ENV === 'development') console.log(`Year ${currentWeek.year}, week ${currentWeek.number}: ALREADY FETCHED`)
      }
    },
    resetFetchedWeeks: ({ commit }) => {
      commit('RESET_FETCHED_WEEKS')
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
    },
    getTodayCourses: state => {
      const today = DateUtil.methods.dateToDayMonthYear(new Date())

      return state.courses.filter(course => {
        const start = DateUtil.methods.dateToDayMonthYear(course.start)
        return (today === start)
      })
    },
    getUpcomingCourses: state => {
      const now = new Date().getTime()

      const array = state.courses.filter(course => {
        const start = new Date(course.start).getTime()
        return now < start
      }).sort((a, b) => (a.start < b.start) ? -1 : 1)

      return array
    },
    getNextCourse: (state, getters) => {
      return getters.getUpcomingCourses[0]
    },
    getNextDayCourses: (state, getters) => {
      const nextCourse = getters.getNextCourse
      if (!nextCourse) return []

      const nextCourseDay = DateUtil.methods.dateToDayMonthYear(nextCourse.start)
      const res = getters.getUpcomingCourses.filter(course => {
        const start = DateUtil.methods.dateToDayMonthYear(course.start)
        return (nextCourseDay === start)
      })
      return res
    },
    getCurrentCourse (state) {
      const now = new Date().getTime()

      return state.courses.filter(course => {
        const start = new Date(course.start).getTime()
        const end = new Date(course.end).getTime()
        return start <= now && now < end
      })[0]
    }
  }
}

const reformatWeek = (week, weekNumber) => {
  const customCourses = []

  // for each day of the week
  for (let [, courses] of Object.entries(week || [])) {
    // for each course of the day
    courses.forEach((course) => {
      customCourses.push({
        title: course.subject.toUpperCase(),
        start: formatDate(course.date, course.start),
        end: formatDate(course.date, course.end),
        className: 'custom-event',
        professor: course.professor,
        room: course.room.split('-')[0].split('(')[0],
        bts: course.bts,
        weekNumber
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
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
  // Return array of year and week number

  // return [date.getUTCFullYear(), weekNo]
  return { year: date.getUTCFullYear(), number: weekNo }
}

export default calendarModule
