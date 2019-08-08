import ApiService from './api.service'

const UserService = {
  // ================================================
  // == Methods
  // ================================================
  login: (email, password, rememberMe) => {
    return ApiService.post('/auth', { email, password, rememberMe })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.response.data)
      })
  }

}

export default UserService
