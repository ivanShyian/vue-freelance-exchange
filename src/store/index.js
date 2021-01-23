import { createStore } from 'vuex'
import newTask from './modules/new'
import tasks from './modules/tasks'
import task from './modules/task'
import appStatus from './modules/appStatus'
import database from './db'
import sortItems from './modules/sortItems'

export default createStore({
  state () {
    return {
      taskList: [],
      sortStatus: 'all' // inprocess, active, done
    }
  },
  getters: {
    getTaskList (state) {
      if (state.sortStatus === 'done') {
        return state.taskList.filter(el => el.type === 'done')
      } else if (state.sortStatus === 'inprocess') {
        return state.taskList.filter(el => el.type === 'inprocess')
      } else if (state.sortStatus === 'active') {
        return state.taskList.filter(el => el.type === 'active')
      } else if (state.sortStatus === 'cancelled') {
        return state.taskList.filter(el => el.type === 'cancelled')
      } else {
        return state.taskList
      }
    },
    getFullTaskList (state) {
      return state.taskList
    },
    activeCount (state) {
      return state.taskList.filter(el => el.type === 'active' || el.type === 'inprocess').length
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
    },
    setFilter (state, payload) {
      state.sortStatus = payload
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
    database,
    sortItems
  }
})
