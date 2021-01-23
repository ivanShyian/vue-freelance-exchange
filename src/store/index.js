import { createStore } from 'vuex'
import newTask from './modules/new'
import tasks from './modules/tasks'
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
    setLocalList (state, payload) {
      state.taskList.push(payload)
    },
    deleteTask (state, payload) {
      state.taskList = state.taskList.filter(el => el.id !== payload)
    },
    clearTaskList (state) {
      state.taskList = []
    },
    changeStatus (state, { status, idx }) {
      state.taskList.forEach(el => {
        if (el.id === idx) {
          el.type = status
        }
      })
    }
  },
  getters: {
    getTaskList ({ taskList }) {
      return taskList
    },
    activeCount ({ taskList }) {
      return taskList.filter(el => el.type === 'active' || el.type === 'pending').length
    }
  },
  actions: {
    pushTaskList ({ rootGetters, commit }) {
      commit('clearTaskList')
      rootGetters['database/getDatabaseData'].forEach(el => {
        commit('setLocalList', el)
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
