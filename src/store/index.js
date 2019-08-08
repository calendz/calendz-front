import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import router from '../routes/router'
import UserService from '../services/user.service'

Vue.use(Vuex)

export default new Vuex.Store({
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
    LOGIN_REQUEST: (state) => {
      state.user = {}
      state.status = { isLoggingIn: true }
    },

    LOGIN_SUCCESS: (state, user) => {
      state.user = user
      state.status = { isLoggedIn: true }
    },

    LOGIN_FAILURE: (state, reason) => {
      state.user = {}
      state.status = { reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    login: ({ commit }, { email, password, rememberMe }) => {
      commit('LOGIN_REQUEST')
      UserService.login(email, password, rememberMe)
        .then(
          user => {
            commit('LOGIN_SUCCESS', user)
            Vue.prototype.$notify({ type: 'success', message: 'Vous êtes désormais connecté.' })
            router.push('/dashboard')
          },
          err => {
            commit('LOGIN_FAILURE', err.message)
            swal.fire({
              type: 'question',
              title: `Mot de passe oublié ?`,
              text: `Pas de panique, indiquez votre adresse mail et nous vous enverrons un lien afin de réinitialiser votre mot de passe.`,
              buttonsStyling: false,
              focusConfirm: true,
              confirmButtonText: 'Réinitialiser',
              confirmButtonClass: 'btn btn-success btn-fill',
              showCancelButton: true,
              cancelButtonText: 'Annuler',
              cancelButtonClass: 'btn btn-secondary btn-fill'
            }).then((result) => {
              if (result.value) this.$router.push('/password-reset')
            })
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  // getters: {
  // }

  // TODO: _must_ be false in production
  strict: true
})
