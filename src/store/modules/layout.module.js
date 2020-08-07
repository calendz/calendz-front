// import Vue from 'vue'

const layoutModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    migrationModal: {
      isOpen: false,
      token: null,
      userEmail: null,
      userCity: null,
      userGrade: null
    }
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    OPEN_MIGRATION_MODAL: (state, data) => {
      state.migrationModal = {
        isOpen: true,
        token: data.token,
        userEmail: data.email,
        userCity: data.city,
        userGrade: data.grade
      }
    },
    CLOSE_MIGRATION_MODAL: (state) => {
      state.migrationModal = {
        isOpen: false,
        token: null,
        userEmail: null,
        userCity: null,
        userGrade: null
      }
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
  }
}

export default layoutModule
