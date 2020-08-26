import ApiService from './api.service'

const TaskService = {
  // ================================================
  // == Methods
  // ================================================

  // get user's tasks
  getAllFrom: (userId) => {
    return ApiService.get(`/tasks/${userId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // create a task
  create: (title, type, subject, date, description, targets) => {
    return ApiService.post('/tasks', { title, type, subject, date, description, targets })
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  // modify task
  modify: (_id, title, type, subject, date, description, targets) => {
    return ApiService.patch(`/tasks/${_id}`, { title, type, subject, date, description, targets })
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  delete: (taskId) => {
    return ApiService.delete(`/tasks/${taskId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  setNotDone: (userId, taskId) => {
    return ApiService.patch(`/tasks/${userId}/notdone/${taskId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  },

  setDone: (userId, taskId) => {
    return ApiService.patch(`/tasks/${userId}/done/${taskId}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err))
  }
}

export default TaskService
