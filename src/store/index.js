import { createStore } from 'vuex'
import createTask from './modules/createTask'
import task from './modules/task'
import appStatus from './modules/appStatus'
import database from './db'

export default createStore({
  state () {
    return {
      taskList: []
    }
  },
  mutations: {
  },
  getters: {
    getTaskList (state) {
      return state.taskList
    }
  },
  actions: {
    pushTaskList (context, payload) {
      if (context.rootGetters['database/getDatabaseData'].length) {
        context.rootGetters['database/getDatabaseData'].forEach(el => {
          context.state.taskList.push(el)
        })
      } else {
        context.state.taskList.push(payload)
      }
    },
    pushMountedTasks (context, payload) {
      payload.forEach(el => {
        context.state.taskList.push(el)
      })
    },
    changeStatus (context, { status, idx }) {
      context.getters.getTaskList.forEach(el => {
        if (el.id === idx) {
          el.type = status
        }
      })
    }
  },
  modules: {
    createTask,
    task,
    appStatus,
    database
  }
})
