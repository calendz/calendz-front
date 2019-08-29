import Vue from 'vue'
import swal from 'sweetalert2'
import router from '../../routes/router'
import UserService from '../../services/user.service'
import ApiService from '../../services/api.service'

const accountModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    REGISTER_REQUEST: (state) => {
      state.user = null
      state.status = { isRegistering: true }
    },

    REGISTER_SUCCESS: (state) => {
      state.user = null
      state.status = {}
    },

    REGISTER_FAILURE: (state, reasons) => {
      state.user = null
      state.status = { registerErrors: reasons }
    },

    LOGIN_REQUEST: (state) => {
      state.user = null
      state.status = { isLoggingIn: true }
    },

    LOGIN_SUCCESS: (state, user) => {
      state.user = user
      state.status = {}
    },

    LOGIN_FAILURE: (state, reason) => {
      state.user = null
      state.status = { loginError: reason }
    },

    LOGOUT: (state, reason) => {
      state.user = null
      state.status = { reason }
    },

    CHANGE_PASSWORD_REQUEST: (state) => {
      state.status = { isChanging: true }
    },

    CHANGE_PASSWORD_SUCCESS: (state) => {
      state.status = {}
    },

    CHANGE_PASSWORD_FAILURE: (state, reason) => {
      state.status = { changePasswordError: reason }
    },

    CHANGE_PARAMETER_REQUEST: (state) => {
      state.status = { isLoading: true }
    },

    CHANGE_PARAMETER_SUCCESS: (state, value) => {
      state.user.hasInformationMails = value
      state.status = {}
    },

    CHANGE_PARAMETER_FAILURE: (state, reason) => {
      state.status = { changeParameterError: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    register: ({ commit }, { firstname, lastname, grade, email, password, password2, agree }) => {
      commit('REGISTER_REQUEST')
      UserService.register(firstname, lastname, grade, email, password, password2, agree)
        .then(
          res => {
            commit('REGISTER_SUCCESS')
            Vue.prototype.$notify({ type: 'success', timeout: 10000, message: 'Votre compte a bien été créé !' })
            Vue.prototype.$notify({ type: 'info', timeout: 10000, message: 'Veuillez <b>vérifier vos mails</b> afin de confirmer votre adresse avant de vous connecter.' })
            router.push('/login')
          },
          err => {
            let errors = []
            err.errors ? errors = err.errors : errors.push(err.message)
            commit('REGISTER_FAILURE', errors)
          })
    },

    login: ({ commit }, { email, password, rememberMe }) => {
      commit('LOGIN_REQUEST')
      UserService.login(email, password, rememberMe)
        .then(
          res => {
            localStorage.setItem('user', JSON.stringify(res.user))
            commit('LOGIN_SUCCESS', res.user)
            Vue.prototype.$notify({ type: 'success', message: 'Vous êtes désormais connecté.' })
            router.push('/dashboard')
          },
          err => {
            commit('LOGIN_FAILURE', err.message)
          })
    },

    logout: ({ commit }, { reason }) => {
      if (reason) {
        Vue.prototype.$notify({ type: 'danger', message: `${reason}.` })
      }
      commit('LOGOUT', reason)
      localStorage.removeItem('user')
      ApiService.post('/auth/logout')
      router.push('/login')
    },

    changePassword: ({ commit, dispatch }, { password, password2 }) => {
      commit('CHANGE_PASSWORD_REQUEST')
      UserService.changePassword(password, password2)
        .then(
          res => {
            commit('CHANGE_PASSWORD_SUCCESS')
            swal.fire({
              title: 'Votre mot de passe à bien été modifié. Vous avez été déconnecté',
              type: 'success',
              customClass: { confirmButton: 'btn btn-primary' }
            })
            dispatch('logout', {})
          },
          err => {
            commit('CHANGE_PASSWORD_FAILURE', err.data.message)
          })
    },

    setInformationMails: ({ commit }, { value }) => {
      commit('CHANGE_PARAMETER_REQUEST')
      UserService.setInformationMails(value)
        .then(
          res => {
            commit('CHANGE_PARAMETER_SUCCESS', value)
            const user = JSON.parse(localStorage.user)
            user.hasInformationMails = value
            localStorage.user = JSON.stringify(user)
            Vue.prototype.$notify({ type: 'success', message: `Changement effectué avec succès.` })
          },
          err => {
            commit('CHANGE_PARAMETER_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `Une erreur est survenue, veuillez réessayer...` })
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoggedIn: state => {
      return !!state.user
    }
  }
}

export default accountModule
