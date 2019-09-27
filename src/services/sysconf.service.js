import ApiService from './api.service'

const SysconfService = {
  // ================================================
  // == Methods
  // ================================================

  // get system's settings
  getSettings: () => {
    return ApiService.get(`/sysconf/settings`)
      .then(res => {
        return res
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  }
}

export default SysconfService
