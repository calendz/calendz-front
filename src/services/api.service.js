import axios from 'axios'
import store from '../store/index'

const ApiService = {
  init (baseURL) {
    axios.defaults.baseURL = baseURL
    axios.defaults.withCredentials = 'include'
    axios.interceptors.response.use(response => {
      return response
    }, err => {
      if (err.response.status === 401) {
        if (err.response.data && err.response.data.logout) {
          store.dispatch('account/logout', { reason: err.response.data.message })
        }
      }

      return Promise.reject(err.response)
    })
  },

  get (resource) {
    return axios.get(resource)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  post (resource, data) {
    return axios.post(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  put (resource, data) {
    return axios.put(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  patch (resource, data) {
    return axios.patch(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  delete (resource) {
    return axios.delete(resource)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
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
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default ApiService
