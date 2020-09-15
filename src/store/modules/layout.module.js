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
    },
    gradeCreationModal: {
      isOpen: false,
      subject: null
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
    },
    OPEN_CREATEGRADE_MODAL: (state, data = {}) => {
      state.gradeCreationModal = {
        isOpen: true,
        subject: data.subject
      }
    },
    CLOSE_CREATEGRADE_MODAL: (state) => {
      state.gradeCreationModal = {
        isOpen: false,
        subject: null
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
