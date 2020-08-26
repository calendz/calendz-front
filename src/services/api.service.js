import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'

const api = axios.create()

const ApiService = {
  init (baseURL) {
    api.defaults.baseURL = baseURL
    api.defaults.withCredentials = 'include'
    api.interceptors.response.use(response => {
      return response
    }, err => {
      // intercept connection errors
      if (!err.response) {
        Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> Veuillez vérifier votre connexion internet !` })
        const error = new Error('Connection failure')
        return Promise.reject(error)
      }

      // intercept authentication errors
      if (err.response.status === 401) {
        if (err.response.data && err.response.data.logout) {
          store.dispatch('account/logout', { reason: err.response.data.message })
        }
      }

      return Promise.reject(err.response)
    })
  },

  get (resource) {
    return api.get(resource)
      .then(response => response)
      .catch(error => Promise.reject(error))
  },

  post (resource, data) {
    return api.post(resource, data)
      .then(response => response)
      .catch(error => Promise.reject(error))
  },

  put (resource, data) {
    return api.put(resource, data)
      .then(response => response)
      .catch(error => Promise.reject(error))
  },

  patch (resource, data) {
    return api.patch(resource, data)
      .then(response => response)
      .catch(error => Promise.reject(error))
  },

  delete (resource) {
    return api.delete(resource)
      .then(response => response)
      .catch(error => Promise.reject(error))
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
    return api(data)
      .then(response => response)
      .catch(error => Promise.reject(error))
  }
}

export default ApiService
