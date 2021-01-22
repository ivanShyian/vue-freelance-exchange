import { createStore } from 'vuex'
import newTask from './modules/new'
import tasks from './modules/tasks'
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
    },
    deleteTask (state, payload) {
      state.taskList = state.taskList.filter(el => el.id !== payload)
    }
  },
  getters: {
    getTaskList ({ taskList }) {
      return taskList
    },
    getTaskListLength ({ taskList }) {
      return taskList.length
    },
    activeCount ({ taskList }) {
      return taskList.filter(el => el.type === 'active' || el.type === 'pending').length
    }
  },
  actions: {
    pushTaskList ({ state: { wasConnected }, rootGetters, commit }) {
      if (rootGetters['database/getDatabaseData'].length && wasConnected === false) {
        rootGetters['database/getDatabaseData'].forEach(el => {
          commit('setLocalList', el)
        })
        commit('setConnection')
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
    newTask,
    tasks,
    task,
    appStatus,
    database
  }
})
