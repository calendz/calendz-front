import ApiService from './api.service'

const TaskService = {
  // ================================================
  // == Methods
  // ================================================

  // get user's tasks
  getAllFrom: (userId) => {
    return ApiService.get(`/tasks/${userId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },

  // create a task
  create: (title, type, subject, date, description) => {
    return ApiService.post('/tasks', { title, type, subject, date, description })
      .then(res => {
        return res.data
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export default TaskService
