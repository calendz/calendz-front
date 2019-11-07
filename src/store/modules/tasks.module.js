import Vue from 'vue'
import swal from 'sweetalert2'
import DateUtil from '../../mixins/dateUtilMixin'
import TaskService from '../../services/task.service'

const tasksModule = {
  namespaced: true,
  // ==================================
  // == State
  // ==================================
  state: {
    tasks: [],
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    FETCH_ALL_REQUEST: (state) => {
      state.status = { isRetrieving: true }
    },
    FETCH_ALL_SUCCESS: (state, tasks) => {
      state.tasks = tasks
      state.status = {}
    },
    FETCH_ALL_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    TASK_CREATE_REQUEST: (state) => {
      state.status = { isCreating: true }
    },
    TASK_CREATE_SUCCESS: (state, task) => {
      state.status = {}
      state.tasks.push(task)
    },
    TASK_CREATE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    TASK_DELETE_REQUEST: (state) => {
      state.status = { isDeleting: true }
    },
    TASK_DELETE_SUCCESS: (state, taskId) => {
      state.tasks = state.tasks.filter(task => task._id !== taskId)
      state.status = {}
    },
    TASK_DELETE_FAILURE: (state, reason) => {
      state.status = { error: reason }
    },

    TASK_MODIFY_REQUEST: (state) => {
      state.status = { isModifying: true }
    },
    TASK_MODIFY_SUCCESS: (state, { id, task }) => {
      const index = state.tasks.findIndex(task => task._id === id)
      state.tasks[index].title = task.title
      state.tasks[index].type = task.type
      state.tasks[index].subject = task.subject
      state.tasks[index].date = task.date
      state.tasks[index].description = task.description
      state.status = {}
    },
    TASK_MODIFY_FAILURE: (state, reason) => {
      state.status = { error: reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    fetchAll: ({ commit, rootState }) => {
      commit('FETCH_ALL_REQUEST')
      TaskService.getAllFrom(rootState.account.user._id)
        .then(
          res => {
            commit('FETCH_ALL_SUCCESS', res.tasks)
          },
          err => {
            commit('FETCH_ALL_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    },

    create: ({ commit }, { title, type, subject, date, description }) => {
      commit('TASK_CREATE_REQUEST')
      TaskService.create(title, type, subject, date, description)
        .then(
          res => {
            commit('TASK_CREATE_SUCCESS', res.task)

            let swalTitle
            switch (type) {
              case 'homework': swalTitle = 'Devoirs ajouté avec succès'; break
              case 'DS': swalTitle = 'Contrôle ajouté avec succès'; break
              case 'task': swalTitle = 'Tâche ajoutée avec succès'; break
            }

            swal.fire({
              title: swalTitle,
              type: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          },
          err => {
            commit('TASK_CREATE_FAILURE', err.data.message)
            swal.fire({
              title: 'Une erreur est survenue',
              text: err.data.message,
              type: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          })
    },

    delete: ({ commit }, { taskId }) => {
      commit('TASK_DELETE_REQUEST')
      TaskService.delete(taskId)
        .then(
          res => {
            commit('TASK_DELETE_SUCCESS', taskId)
            Vue.prototype.$notify({ type: 'success', message: `La tâche a bien été supprimée !` })
          },
          err => {
            commit('TASK_DELETE_FAILURE', err.data.message)
            Vue.prototype.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || 'Une erreur est survenue...'}` })
          })
    },

    modify: ({ commit }, { _id, title, type, subject, date, description }) => {
      commit('TASK_MODIFY_REQUEST')
      TaskService.modify(_id, title, type, subject, date, description)
        .then(
          res => {
            commit('TASK_MODIFY_SUCCESS', { id: _id, task: res.task })

            let swalTitle
            switch (type) {
              case 'homework': swalTitle = 'Devoirs modifié avec succès'; break
              case 'DS': swalTitle = 'Contrôle modifié avec succès'; break
              case 'task': swalTitle = 'Tâche modifié avec succès'; break
            }

            swal.fire({
              title: swalTitle,
              type: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          },
          err => {
            commit('TASK_MODIFY_FAILURE', err.data.message)
            swal.fire({
              title: 'Une erreur est survenue',
              text: err.data.message,
              type: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    isRetrieving: state => {
      return !!state.status.isRetrieving
    },
    getDone: (state, getters, rootState) => {
      const doneTasks = rootState.account.user.tasks.done
      const array = [...state.tasks].filter(task => doneTasks.includes(task._id))
      array.sort((a, b) => (a.date > b.date) ? -1 : 1)
      return array
    },
    getTodo: (state, getters, rootState) => {
      const now = new Date().getTime()
      const doneTasks = rootState.account.user.tasks.done
      let array = [...state.tasks].filter(task => now < parseInt(task.date))
      array = array.filter(task => !doneTasks.includes(task._id))
      array.sort((a, b) => (a.date < b.date) ? -1 : 1)
      return array
    },
    getNotDone: (state, getters, rootState) => {
      const now = new Date().getTime()
      const doneTasks = rootState.account.user.tasks.done
      let array = [...state.tasks].filter(task => !doneTasks.includes(task._id))
      array = array.filter(task => now > parseInt(task.date))
      array.sort((a, b) => (a.date < b.date) ? -1 : 1)
      return array
    },
    getAll: state => {
      const array = [...state.tasks]
      array.sort((a, b) => (a.date > b.date) ? -1 : 1)
      return array
    },
    getNextOneNotDone: (state, getters, rootState) => {
      const doneTasks = rootState.account.user.tasks.done
      const array = [...state.tasks].filter(task => !doneTasks.includes(task._id))
      array.sort((a, b) => (a.date < b.date) ? -1 : 1)
      return array[0]
    },
    getUpcommings: (state) => {
      const now = new Date().getTime()
      const array = [...state.tasks].filter(task => now < parseInt(task.date))
      array.sort((a, b) => (a.date < b.date) ? -1 : 1)
      return array.slice(0, 3)
    },
    getAsEvents: (state) => {
      const tasks = [...state.tasks]
      const events = []

      tasks.forEach(task => {
        const eventDate = new Date(DateUtil.methods.timestampToDate(task.date)).getTime()
        const event = events.find(event => event.start === eventDate)

        // si on a pas encore créé d'event pour la tâche
        // alors on le créer
        if (!event) {
          events.push({
            amount: 1,
            tasks: [task],
            start: eventDate,
            allDay: true
          })
          return
        }

        // sinon on incrément le nombre d'events pour ce jour
        event.amount++
        event.tasks.push(task)
      })

      return events
    }
  }
}

export default tasksModule
