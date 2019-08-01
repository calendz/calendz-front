import ApiService from './api.service'
import { TokenService } from './storage.service'
import Axios from 'axios'

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
      data,
      credentials: 'include'
    }

    // await ApiService.customRequest(requestData).then((res) => {
    //   UserService.setUser(res.data.user)
    //   TokenService.setToken(res.data.accessToken)
    //   ApiService.setHeader()
    // })

    Axios.defaults.withCredentials = 'include'
    await Axios.post('http://localhost:3001/api/v1/auth', { email: 'arthur.dufour1@epsi.fr', password: 'password' })

    // await fetch('http://localhost:3001/api/v1/auth', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({ email: 'arthur.dufour1@epsi.fr', password: 'password' })
    // })
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
