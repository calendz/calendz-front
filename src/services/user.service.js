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

  // login
  login: (email, password, rememberMe) => {
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
        return Promise.reject(err.response)
      })
  },

  // change user's subscription to email
  changeIsSubMail: (isSubMail, userId) => {
    return ApiService.patch('/user/isSubMail', { isSubMail, userId })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  }
}

export default UserService
