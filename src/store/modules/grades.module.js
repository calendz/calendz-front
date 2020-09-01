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
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {

  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoading: state => {
      return !!state.status.isRetrieving
    },
    completedCount: state => {
      return state.grades.filter(grade => !!grade.value)
    },
    pendingCount: state => {
      return state.grades.filter(grade => !grade.value)
    }
  }
}

export default gradesModule
