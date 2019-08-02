import Vue from 'vue'
import router from '../routes/router'
import ApiService from './api.service'

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
    })
  },

  // Logout the current user by removing its token and its data
  logout: () => {
    UserService.removeUser()
  },

  // Register the user
  register: async (data) => {
    const requestData = {
      method: 'post',
      url: '/user',
      data
    }

    await ApiService.customRequest(requestData)
  },

  // Checks if user is still logged in
  // refresh its access token if needed
  verify: async () => {
    const requestData = {
      method: 'post',
      url: '/auth/verify'
    }

    await ApiService.customRequest(requestData).catch(async (err) => {
      if (err.response.status !== 401) return
      requestData.url = '/auth/refresh'
      await ApiService.customRequest(requestData).catch((err) => {
        Vue.prototype.$notify({ type: 'danger', message: `${err.response.data.message}.` })
        UserService.removeUser()
        router.push('/login')
      })
    })
  }
}

export default UserService

export { UserService }
