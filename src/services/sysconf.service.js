import ApiService from './api.service'

const SysconfService = {
  // ================================================
  // == Methods
  // ================================================

  // get system's settings
  getSettings: () => {
    return ApiService.get(`/sysconf/settings`)
      .then(res => res)
      .catch(err => Promise.reject(err.data))
  },

  // get statistics
  getStats: () => {
    return ApiService.get(`/sysconf/stats`)
      .then(res => res)
      .catch(err => Promise.reject(err))
  },

  toggleLogin: (value) => {
    return ApiService.patch(`/sysconf/settings/login-enabled/${value}`)
      .then(res => res)
      .catch(err => Promise.reject(err.data))
  },

  toggleRegister: (value) => {
    return ApiService.patch(`/sysconf/settings/register-enabled/${value}`)
      .then(res => res)
      .catch(err => Promise.reject(err.data))
  },

  disconnectAllUsers: () => {
    return ApiService.delete(`/sysconf/refresh-tokens/all`)
      .then(res => res)
      .catch(err => Promise.reject(err.data))
  },

  migrateAllUsers: () => {
    return ApiService.patch(`/sysconf/migrate/all`)
      .then(res => res)
      .catch(err => Promise.reject(err.data))
  }
}

export default SysconfService
