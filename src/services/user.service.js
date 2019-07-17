import ApiService from './api.service'
import { TokenService } from './storage.service'

const USER_KEY = 'user'

const UserService = {
  // ================================================
  // == Getters and setters
  // ================================================

  getUser: () => {
    return JSON.parse(localStorage.getItem(USER_KEY))
  },

  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY)
  },

  // ================================================
  // == Other methods
  // ================================================

  // Login the user, stores its token and its data
  login: async (data) => {
    const requestData = {
      method: 'post',
      url: '/auth',
      data
    }

    await ApiService.customRequest(requestData).then((res) => {
      UserService.setUser(res.data.user)
      TokenService.setToken(res.data.accessToken)
      ApiService.setHeader()
    })
  },

  // Logout the current user by removing its token and its data
  logout: () => {
    UserService.removeUser()
    TokenService.removeToken()
    ApiService.removeHeader()
  },

  // Register the user
  register: async (data) => {
    const requestData = {
      method: 'post',
      url: '/user',
      data
    }

    await ApiService.customRequest(requestData)
  }
}

export default UserService

export { UserService }
