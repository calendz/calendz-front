import ApiService from './api.service'

const UserService = {
  // ================================================
  // == Methods
  // ================================================

  // get user's notifications
  getAllFrom: (userId) => {
    return ApiService.get(`/notifications/${userId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // mark a notification as read
  read: (userId, notifId) => {
    return ApiService.patch(`/notifications/${userId}/read/${notifId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  },

  // mark all user's notifications as read
  readAll: (userId) => {
    return ApiService.patch(`/notifications/${userId}/read/all`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  }
}

export default UserService
