import { createStore } from 'vuex'
import createTask from './modules/createTask'
import task from './modules/task'
import appStatus from './modules/appStatus'
import database from './db'

export default createStore({
  state () {
    return {
      taskList: [],
      wasConnected: false
    }
  },
  mutations: {
    setConnection (state) {
      state.wasConnected = true
    },
    setLocalList (state, payload) {
      state.taskList.push(payload)
    }
  },
  getters: {
    getTaskList ({ taskList }) {
      return taskList
    },
    getTaskListLength ({ taskList }) {
      return taskList.length
    }
  },
  actions: {
    pushTaskList (context) {
      if (context.rootGetters['database/getDatabaseData'].length &&
        context.state.wasConnected === false) {
        context.rootGetters['database/getDatabaseData']
          .forEach(el => { context.commit('setLocalList', el) })
        context.commit('setConnection')
      }
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
