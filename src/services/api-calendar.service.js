import Vue from 'vue'
import axios from 'axios'
const customAxios = axios.create()

const ApiCalendarService = {
  init (baseURL, token) {
    customAxios.defaults.baseURL = baseURL
    customAxios.defaults.headers.common['x-access-token'] = token
    customAxios.interceptors.response.use(response => {
      return response
    }, err => {
      // intercept connection errors
      if (!err.response) {
        Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> Veuillez vérifier votre connexion internet !` })
        const error = new Error('Connection failure')
        return Promise.reject(error)
      }

      return Promise.reject(err.response)
    })
  },

  get (resource) {
    return customAxios.get(resource)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  post (resource, data) {
    return customAxios.post(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  put (resource, data) {
    return customAxios.put(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  patch (resource, data) {
    return customAxios.patch(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  delete (resource) {
    return customAxios.delete(resource)
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
    return customAxios(data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default ApiCalendarService
