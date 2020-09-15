import Vue from 'vue'
import swal from 'sweetalert2'
import router from '../../routes/router'
import UserService from '../../services/user.service'
import ApiService from '../../services/api.service'
import TaskService from '../../services/task.service'

const accountModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: {},
    attempts: 0
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    RESET: (state) => {
      state.user = null
      state.status = {}
      state.attempts = 0
    },

    FETCH_REQUEST: (state) => {
      state.status = { isFetching: true }
    },
    FETCH_SUCCESS: (state, user) => {
      state.user = user
      state.status = { isFetching: false }
    },
    FETCH_FAILURE: (state, reason) => {
      state.status = { isFetching: false, fetchError: reason }
    },

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
      state.attempts = 0
    },
    LOGIN_FAILURE: (state, { reason, userId = null }) => {
      state.user = null
      state.status = { loginError: reason, userId: userId }
      state.attempts++
    },

    LOGOUT: (state, reason) => {
      state.user = null
      state.status = { reason }
    },

    MIGRATION_REQUEST: (state) => {
      state.status = { isMigrating: true }
    },
    MIGRATION_SUCCESS: (state, data) => {
      state.status = { isMigrating: false }
    },
    MIGRATION_FAILURE: (state, reason) => {
      state.status = { isMigrating: false, migrationError: reason }
    },

    UPDATE_PROFILE_REQUEST: (state) => {
      state.status = { isUpdating: true }
    },
    UPDATE_PROFILE_SUCCESS: (state, data) => {
      state.status = {}
      state.user.bts = data.bts
      state.user.group = data.group
    },
    UPDATE_PROFILE_FAILURE: (state, reason) => {
      state.status = { updateProfileError: reason }
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
    },

    CHANGE_SETTINGS_MAIL_TASK_CREATE_REQUEST: (state) => {
      state.status = { isLoading: true }
    },
    CHANGE_SETTINGS_MAIL_TASK_CREATE_SUCCESS: (state, value) => {
      state.user.settings.mail.taskCreate = value
      state.status = {}
    },
    CHANGE_SETTINGS_MAIL_TASK_CREATE_FAILURE: (state, reason) => {
      state.status = { changeSettingsError: reason }
    },

    CHANGE_CALENDAR_COLOR_REQUEST: (state) => {
      state.status = { isLoading: true }
    },
    CHANGE_CALENDAR_COLOR_SUCCESS: (state, value) => {
      state.user.settings.calendarColor = value
      state.status = {}
    },
    CHANGE_CALENDAR_COLOR_FAILURE: (state, reason) => {
      state.status = { changeParameterError: reason }
    },

    CHANGE_AVATAR_REQUEST: (state) => {
      state.status = { isChanging: true }
    },
    CHANGE_AVATAR_SUCCESS: (state, value) => {
      state.user.avatarUrl = value
      state.status = {}
    },
    CHANGE_AVATAR_FAILURE: (state, reason) => {
      state.status = { changeAvatarError: reason }
    },

    UPDATE_USER_REQUEST: (state) => {
      state.status = { isUpdating: true }
    },
    UPDATE_USER_SUCCESS: (state) => {
      state.status = {}
    },
    UPDATE_USER_FAILURE: (state, reason) => {
      state.status = { reason }
    },

    DELETE_USER_REQUEST: (state) => {
      state.status = { isDeleting: true }
    },
    DELETE_USER_SUCCESS: (state) => {
      state.status = {}
    },
    DELETE_USER_FAILURE: (state, reason) => {
      state.status = { deleteError: reason }
    },

    SET_NOTDONE_REQUEST: (state) => {
      state.status = { isToggling: true }
    },
    SET_NOTDONE_SUCCESS: (state, taskId) => {
      state.user.tasks.done = state.user.tasks.done.filter(id => id !== taskId)
      state.status = {}
    },
    SET_NOTDONE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    SET_DONE_REQUEST: (state) => {
      state.status = { isToggling: true }
    },
    SET_DONE_SUCCESS: (state, taskId) => {
      state.user.tasks.done.push(taskId)
      state.status = {}
    },
    SET_DONE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    register: ({ commit }, { firstname, lastname, grade, group, city, email, password, password2, agree }) => {
      commit('REGISTER_REQUEST')
      UserService.register(firstname, lastname, grade, group, city, email.toLowerCase(), password, password2, agree)
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

    login: ({ state, commit }, { email, password, rememberMe, redirect }) => {
      commit('LOGIN_REQUEST')
      commit('calendar/RESET', {}, { root: true })
      UserService.login(email.toLowerCase(), password, rememberMe)
        .then(
          res => {
            localStorage.setItem('user', JSON.stringify(res.user))
            commit('LOGIN_SUCCESS', res.user)
            Vue.prototype.$notify({ type: 'success', message: 'Vous êtes désormais connecté.' })

            // si ?redirect est défini
            redirect
              ? router.push(decodeURI(redirect))
              : router.push(localStorage.getItem('calendz.settings.defaultPage') || '/dashboard')
          },
          err => {
            // si code ancien étudiant
            if (err && err.code === 'OLD_STUDENT') {
              commit('LOGIN_FAILURE', { reason: err.message })
              swal.fire({
                icon: 'success',
                title: `Vous avez fini vos études !`,
                text: `Ou du moins, vous en avez fini avec l'EPSI/WIS ! Félicitations ! Nous vous souhaitons une superbe carrière !`,
                buttonsStyling: false,
                focusConfirm: true,
                confirmButtonText: 'Merci',
                confirmButtonClass: 'btn btn-success btn-fill'
              })
              return
            }

            // si code besoin de maj
            if (err && err.code === 'REQUIRE_MIGRATION') {
              swal.fire({
                icon: 'info',
                title: `Mise-à-jour requise`,
                text: `Il semblerait que ça soit la première fois que vous vous connectez cette année. Vous devez mettre à jour certaines informations sur votre profil.`,
                buttonsStyling: false,
                focusConfirm: true,
                confirmButtonText: 'Commencer',
                confirmButtonClass: 'btn btn-primary btn-fill'
              }).then((result) => {
                // affichage modal pour maj profil
                commit('layout/OPEN_MIGRATION_MODAL', err.info, { root: true })
                commit('LOGIN_FAILURE', { reason: err.message })
              })

              return
            }

            // si "erreur classique"
            if (err && err.userId) {
              commit('LOGIN_FAILURE', { reason: err.message, userId: err.userId })
            } else {
              commit('LOGIN_FAILURE', { reason: err && err.message ? err.message : 'Une erreur est survenue' })
            }

            if (state.attempts >= 3) {
              swal.fire({
                icon: 'question',
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
                if (result.value) router.push('/password-reset')
              })
            }
          })
    },

    migrate: ({ commit }, { token, grade, group, city, bts }) => {
      commit('MIGRATION_REQUEST')
      UserService.migrate(token, grade, group, city, bts)
        .then(
          res => {
            commit('MIGRATION_SUCCESS')
            commit('layout/CLOSE_MIGRATION_MODAL', {}, { root: true })
            swal.fire({
              icon: 'success',
              title: 'Tout est prêt !',
              text: 'Votre compte a bien été mis-à-jour, vous pouvez désormais vous connecter !',
              customClass: { confirmButton: 'btn btn-primary' }
            })
          },
          err => {
            commit('MIGRATION_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Erreur inconnue...'}` })
          })
    },

    fetch: ({ commit }) => {
      commit('FETCH_REQUEST')
      UserService.fetch()
        .then(
          res => {
            commit('FETCH_SUCCESS', res.user)
            localStorage.user = JSON.stringify(res.user)
            commit('notifications/NOTIF_SUCCESS', res.notifications, { root: true })
            commit('tasks/FETCH_ALL_SUCCESS', res.tasks, { root: true })
            commit('grades/FETCH_ALL_SUCCESS', res.grades, { root: true })
          },
          err => {
            commit('FETCH_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Erreur inconnue...'}` })
          })
    },

    logout: ({ commit }, { reason }) => {
      if (reason) {
        Vue.prototype.$notify({ type: 'danger', message: `${reason}.` })
      }
      ApiService.post('/auth/logout')
      localStorage.removeItem('user')
      commit('LOGOUT', reason)
      commit('RESET')
      commit('notifications/RESET', {}, { root: true })
      commit('calendar/RESET', {}, { root: true })
      commit('tasks/RESET', {}, { root: true })
      router.push('/login')
    },

    updateProfile: ({ commit }, { bts, group }) => {
      commit('UPDATE_PROFILE_REQUEST')
      UserService.updateProfile({ bts, group })
        .then(
          res => {
            commit('UPDATE_PROFILE_SUCCESS', { bts, group })
            const user = JSON.parse(localStorage.user)
            user.bts = bts
            user.group = group
            localStorage.user = JSON.stringify(user)
            Vue.prototype.$notify({ type: 'success', message: `Modification effectuée avec succès !` })
          },
          err => {
            commit('UPDATE_PROFILE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Erreur inconnue...'}` })
          })
    },

    changePassword: ({ commit, dispatch }, { password, password2 }) => {
      commit('CHANGE_PASSWORD_REQUEST')
      UserService.changePassword(password, password2)
        .then(
          res => {
            commit('CHANGE_PASSWORD_SUCCESS')
            swal.fire({
              icon: 'success',
              title: 'Votre mot de passe à bien été modifié. Vous avez été déconnecté',
              customClass: { confirmButton: 'btn btn-primary' }
            })
            dispatch('logout', {})
          },
          err => {
            commit('CHANGE_PASSWORD_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Erreur inconnue...'}` })
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
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Erreur inconnue...'}` })
          })
    },

    setMailTaskCreate: ({ commit }, { value }) => {
      commit('CHANGE_SETTINGS_MAIL_TASK_CREATE_REQUEST')
      UserService.setMailTaskCreate(value)
        .then(
          res => {
            commit('CHANGE_SETTINGS_MAIL_TASK_CREATE_SUCCESS', value)
            const user = JSON.parse(localStorage.user)
            user.settings.mail.taskCreate = value
            localStorage.user = JSON.stringify(user)
            Vue.prototype.$notify({ type: 'success', message: `Changement effectué avec succès.` })
          },
          err => {
            commit('CHANGE_SETTINGS_MAIL_TASK_CREATE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Erreur inconnue...'}` })
          })
    },

    changeCalendarColor: ({ commit }, { value }) => {
      commit('CHANGE_CALENDAR_COLOR_REQUEST')
      UserService.setCalendarColor(value)
        .then(
          res => {
            commit('CHANGE_CALENDAR_COLOR_SUCCESS', value)
            const user = JSON.parse(localStorage.user)
            user.settings.calendarColor = value
            localStorage.user = JSON.stringify(user)
            Vue.prototype.$notify({ type: 'success', message: `Couleur de l'emploi du temps modifiée avec succès.` })
          },
          err => {
            commit('CHANGE_CALENDAR_COLOR_FAILURE', err.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.message || 'Erreur inconnue...'}` })
          })
    },

    update: ({ commit }, { _id, firstname, lastname, email, permissionLevel, grade, group, city, bts, hasInformationMails, isActive }) => {
      commit('UPDATE_USER_REQUEST')
      UserService.updateInformations(_id, firstname, lastname, email, permissionLevel, grade, group, city, bts, hasInformationMails, isActive)
        .then(
          res => {
            commit('UPDATE_USER_SUCCESS')
            swal.fire({
              icon: 'success',
              title: 'Les informations de l\'utilisateur ont bien été modifiés !',
              customClass: { confirmButton: 'btn btn-primary' }
            })
          },
          err => {
            commit('UPDATE_USER_FAILURE', err.data.message)
            swal.fire({
              icon: 'error',
              title: 'Erreur dans la modification des informations !',
              text: err.data.errors[0] || 'Erreur inconnue...',
              customClass: { confirmButton: 'btn btn-primary' }
            })
          })
    },

    delete: ({ commit }, { userId }) => {
      commit('DELETE_USER_REQUEST')
      UserService.deleteAccount(userId)
        .then(
          res => {
            commit('DELETE_USER_SUCCESS')
            swal.fire({
              icon: 'success',
              title: 'L\'utilisateur à bien été supprimé',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          },
          err => {
            commit('DELETE_USER_FAILURE', err.message)
            swal.fire({
              icon: 'error',
              title: 'Une erreur est survenue !',
              text: err.message || 'Erreur inconnue...',
              customClass: { confirmButton: 'btn btn-primary' }
            })
          })
    },

    deleteSelf: ({ commit, dispatch }) => {
      commit('DELETE_USER_REQUEST')
      UserService.deleteSelf()
        .then(
          res => {
            commit('DELETE_USER_SUCCESS')
            Vue.prototype.$notify({ type: 'success', message: `Votre compte a bien été supprimé...` })
            dispatch('logout', {})
          },
          err => {
            commit('DELETE_USER_FAILURE', err.data.message)
            swal.fire({
              icon: 'error',
              title: 'Une erreur est survenue !',
              text: err.data.message || 'Erreur inconnue...',
              customClass: { confirmButton: 'btn btn-primary' }
            })
          })
    },

    changeAvatar: ({ commit }, { avatar }) => {
      commit('CHANGE_AVATAR_REQUEST')
      UserService.setAvatar(avatar)
        .then(
          res => {
            commit('CHANGE_AVATAR_SUCCESS', avatar)
            const user = JSON.parse(localStorage.user)
            user.avatarUrl = avatar
            localStorage.user = JSON.stringify(user)
            Vue.prototype.$notify({ type: 'success', message: `Avatar modifié avec succès.` })
          },
          err => {
            commit('CHANGE_AVATAR_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    },

    setTaskNotDone: ({ commit, state }, { taskId }) => {
      commit('SET_NOTDONE_REQUEST')
      TaskService.setNotDone(state.user._id, taskId)
        .then(
          res => {
            const user = JSON.parse(localStorage.user)
            user.tasks.done = user.tasks.done.filter(id => id !== taskId)
            localStorage.user = JSON.stringify(user)
            commit('SET_NOTDONE_SUCCESS', taskId)
            Vue.prototype.$notify({ type: 'success', message: `Tâche marquée comme non-faite !` })
          },
          err => {
            commit('SET_NOTDONE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    },

    setTaskDone: ({ commit, state }, { taskId }) => {
      commit('SET_DONE_REQUEST')
      TaskService.setDone(state.user._id, taskId)
        .then(
          res => {
            const user = JSON.parse(localStorage.user)
            user.tasks.done.push(taskId)
            localStorage.user = JSON.stringify(user)
            commit('SET_DONE_SUCCESS', taskId)
            Vue.prototype.$notify({ type: 'success', message: `Tâche marquée comme faite !` })
          },
          err => {
            commit('SET_DONE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoggedIn: state => {
      return !!state.user
    },
    isFetching: state => {
      return !!state.status.isFetching
    },
    user: state => {
      return state.user
    }
  }
}

export default accountModule
