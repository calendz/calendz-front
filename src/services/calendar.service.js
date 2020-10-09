import ApiCalendarService from './api-calendar.service'

const CalendarService = {
  // ================================================
  // == Methods
  // ================================================
  getCurrentWeek: (email) => {
    const firstname = email.split('@')[0].split('.')[0]
    const lastname = email.split('@')[0].split('.')[1]

    return ApiCalendarService.get(`/week?firstname=${firstname}&lastname=${lastname}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  getWeek: (email, date, force = false) => {
    const firstname = email.split('@')[0].split('.')[0]
    const lastname = email.split('@')[0].split('.')[1]

    const url = force
      ? `/week/${date}?firstname=${firstname}&lastname=${lastname}&ignoreCache=true`
      : `/week/${date}?firstname=${firstname}&lastname=${lastname}`

    return ApiCalendarService.get(url)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  updateWeek: (email, date) => {
    const firstname = email.split('@')[0].split('.')[0]
    const lastname = email.split('@')[0].split('.')[1]

    const url = `/week/${date}/update?firstname=${firstname}&lastname=${lastname}`

    return ApiCalendarService.get(url)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  fetchTeamsLinks: (email) => {
    // const firstname = email.split('@')[0].split('.')[0]
    // const lastname = email.split('@')[0].split('.')[1]
    const firstname = 'daniel'
    const lastname = 'gavriline'

    const url = `/teams?firstname=${firstname}&lastname=${lastname}`

    return ApiCalendarService.get(url)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  }
}

export default CalendarService
