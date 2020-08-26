import Vue from 'vue'
import axios from 'axios'

const apiCalendar = axios.create()

const ApiCalendarService = {
  init (baseURL) {
    apiCalendar.defaults.baseURL = baseURL
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
    return apiCalendar(data)
      .then(response => response)
      .catch(error => Promise.reject(error))
  }
}

export default ApiCalendarService
