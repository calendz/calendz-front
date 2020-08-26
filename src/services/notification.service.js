import ApiService from './api.service'

const NotificationService = {
  // ================================================
  // == Methods
  // ================================================

  // get user's notifications
  getAllFrom: (userId) => {
    return ApiService.get(`/notifications/${userId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // mark a notification as read
  read: (userId, notifId) => {
    return ApiService.patch(`/notifications/${userId}/read/${notifId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // mark all user's notifications as read
  readAll: (userId) => {
    return ApiService.patch(`/notifications/${userId}/read/all`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  // create a notification
  create: (target, title, message, icon, type) => {
    return ApiService.post(`/notifications`, { target, title, message, icon, type })
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  }
}

export default NotificationService
