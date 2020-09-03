import ApiService from './api.service'

const GradesService = {
  // ================================================
  // == Methods
  // ================================================

  // create a grade
  create: (value, coefficient, subject, date, description) => {
    return ApiService.post('/grades', { value, coefficient, subject, date, description })
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  }
}

export default GradesService
