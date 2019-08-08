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
        return Promise.reject(err.response)
      })
  },

  // login
  login: (email, password, rememberMe) => {
    return ApiService.post('/auth', { email, password, rememberMe })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.response)
      })
  },

  // check if accessToken is valid
  verify: () => {
    return ApiService.post('/auth/verify')
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.response)
      })
  },

  // try refreshing accesToken
  refresh: () => {
    return ApiService.post('/auth/refresh')
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.response)
      })
  }

}

export default UserService
