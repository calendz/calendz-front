import ApiService from './api.service'

const UserService = {
  // ================================================
  // == Methods
  // ================================================

  // register
  register: (firstname, lastname, grade, email, password, password2, agree) => {
    return ApiService.post('/user', { firstname, lastname, grade, email, password, password2, agree })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // verify user email address*
  verifyEmail: (token) => {
    return ApiService.post('/auth/verify/email', { token })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // login
  login: (email, password, rememberMe) => {
    console.log('test')
    return ApiService.post('/auth', { email, password, rememberMe })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // change user's password
  changePassword: (password, password2) => {
    return ApiService.patch('/user/password', { password, password2 })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // update user informations
  updateInformations: (id, firstname, lastname, email, permissionLevel, grade, bts, isActive) => {
    return ApiService.patch(`/user/${id}`, { firstname, lastname, email, permissionLevel, grade, bts, isActive })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // delete user account
  deleteAccount: (userId) => {
    return ApiService.delete(`/user/${userId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // get all users
  getAll: () => {
    return ApiService.get('/user/all')
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // change user's subscription to email
  setInformationMails: (value) => {
    return ApiService.patch(`/user/information-mails/${value}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  }
}

export default UserService
