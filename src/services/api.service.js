import axios from 'axios'
import store from '../store/index'

const ApiService = {
  init (baseURL) {
    axios.defaults.baseURL = baseURL
    axios.defaults.withCredentials = 'include'
    axios.interceptors.response.use(res => {
      return res
    }, err => {
      if (err.response.status === 401) {
        if (err.response.data && err.response.data.logout) {
          store.dispatch('account/logout', { reason: err.response.data.message })
        }
      } else {
        Promise.reject(err)
      }
    })
  },

  get (resource) {
    return axios.get(resource)
  },

  post (resource, data) {
    return axios.post(resource, data)
  },

  put (resource, data) {
    return axios.put(resource, data)
  },

  patch (resource, data) {
    return axios.patch(resource, data)
  },

  delete (resource) {
    return axios.delete(resource)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
  **/
  customRequest (data) {
    return axios(data)
  }
}

export default ApiService
