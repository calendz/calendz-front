import Vue from 'vue'
import axios from 'axios'
const apiCalendar = axios.create()

const ApiCalendarService = {
  init (baseURL, token) {
    apiCalendar.defaults.baseURL = baseURL
    apiCalendar.defaults.headers.common['x-access-token'] = token
    apiCalendar.interceptors.response.use(response => {
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
    return apiCalendar.get(resource)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  post (resource, data) {
    return apiCalendar.post(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  put (resource, data) {
    return apiCalendar.put(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  patch (resource, data) {
    return apiCalendar.patch(resource, data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  delete (resource) {
    return apiCalendar.delete(resource)
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
    return apiCalendar(data)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default ApiCalendarService
