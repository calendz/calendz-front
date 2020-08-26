import ApiService from './api.service'

const UserService = {
  // ================================================
  // == Methods
  // ================================================

  // register
  register: (firstname, lastname, grade, group, city, email, password, password2, agree) => {
    return ApiService.post('/user', { firstname, lastname, grade, group, city, email, password, password2, agree })
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // verify user email address*
  verifyEmail: (token) => {
    return ApiService.post('/auth/verify/email', { token })
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // login
  login: (email, password, rememberMe) => {
    return ApiService.post('/auth', { email, password, rememberMe })
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // account migration
  migrate: (token, grade, group, city, bts) => {
    return ApiService.post('/user/migrate', { token, grade, group, city, bts })
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // fetch current user's data
  fetch: () => {
    return ApiService.get('/user/fetch')
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // change user's bts status
  changeBts: (bts) => {
    return ApiService.patch(`/user/bts/${bts}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // change user's password
  changePassword: (password, password2) => {
    return ApiService.patch('/user/password', { password, password2 })
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // change user's avatar
  setAvatar: (avatar) => {
    return ApiService.patch('/user/avatar', { avatar })
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // get all user's data by its id
  getById: (id) => {
    return ApiService.get(`/user/${id}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // update user informations
  updateInformations: (id, firstname, lastname, email, permissionLevel, grade, group, city, bts, hasInformationMails, isActive) => {
    return ApiService.patch(`/user/${id}`, { firstname, lastname, email, permissionLevel, grade, group, city, bts, hasInformationMails, isActive })
      .then(res => res)
      .catch(err => Promise.reject(err))
  },

  // delete user account
  deleteAccount: (userId) => {
    return ApiService.delete(`/user/${userId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  deleteSelf: () => {
    return ApiService.delete(`/user`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // list all users
  listAll: () => {
    return ApiService.get('/user/all')
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // change user's subscription to email
  setInformationMails: (value) => {
    return ApiService.patch(`/user/information-mails/${value}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // change user's subscription to email when new tasks are created
  setMailTaskCreate: (value) => {
    return ApiService.patch(`/user/settings/mail-task-create/${value}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // change user's calendar color
  setCalendarColor: (value) => {
    return ApiService.patch(`/user/calendar-color/${value}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  }
}

export default UserService
