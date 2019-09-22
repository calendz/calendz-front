import ApiCalendarService from './api-calendar.service'

const CalendarService = {
  // ================================================
  // == Methods
  // ================================================
  getCurrentWeek: (email) => {
    const firstname = email.split('@')[0].split('.')[0]
    const lastname = email.split('@')[0].split('.')[1]

    return ApiCalendarService.get(`/week/?firstname=${firstname}&lastname=${lastname}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err.data)
      })
  }
}

export default CalendarService
