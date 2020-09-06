import Vue from 'vue'
import GradesService from '../../services/grades.service'

const gradesModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    grades: [],
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    RESET: (state) => {
      state.grade = []
      state.status = {}
    },

    FETCH_ALL_REQUEST: (state) => {
      state.status = { isRetrieving: true }
    },
    FETCH_ALL_SUCCESS: (state, grades) => {
      state.grades = grades
      state.status = {}
    },
    FETCH_ALL_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    GRADE_CREATE_REQUEST: (state) => {
      state.status = { isCreating: true }
    },
    GRADE_CREATE_SUCCESS: (state, grade) => {
      state.status = {}
      state.grades.push(grade)
    },
    GRADE_CREATE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    GRADE_UPDATE_REQUEST: (state) => {
      state.status = { isUpdating: true }
    },
    GRADE_UPDATE_SUCCESS: (state, { id, grade }) => {
      state.status = {}
      const index = state.grades.findIndex(grade => grade._id === id)
      state.grades[index].value = grade.value
      state.grades[index].coefficient = grade.coefficient
      state.grades[index].date = grade.date
      state.grades[index].description = grade.description
    },
    GRADE_UPDATE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    create: ({ commit }, { value, coefficient, subject, date, description }) => {
      commit('GRADE_CREATE_REQUEST')

      GradesService.create(value, coefficient, subject, date, description)
        .then(
          res => {
            commit('GRADE_CREATE_SUCCESS', res.grade)
            Vue.prototype.$notify({ type: 'success', message: `Note ajoutée avec succès !` })
          },
          err => {
            commit('GRADE_CREATE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    },

    update: ({ commit }, { _id, value, coefficient, date, description }) => {
      commit('GRADE_UPDATE_REQUEST')

      GradesService.update(_id, value, coefficient, date, description)
        .then(
          res => {
            commit('GRADE_UPDATE_SUCCESS', { id: _id, grade: res.grade })
            Vue.prototype.$notify({ type: 'success', message: `Note mise-à-jour avec succès !` })
          },
          err => {
            commit('GRADE_UPDATE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
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
    completed: state => {
      return state.grades.filter(grade => !!grade.value)
    },
    pending: state => {
      return state.grades.filter(grade => !grade.value)
    }
  }
}

export default gradesModule
