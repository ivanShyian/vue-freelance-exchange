import { createStore } from 'vuex'
import createTask from './modules/createTask'
import task from './modules/task'
import appStatus from './modules/appStatus'

export default createStore({
  state () {
    return {
      taskList: [],
      taskId: null
    }
  },
  mutations: {
    createTaskList ({ taskList }, payload) {
      taskList.push(payload)
    },
    setTaskId (state, payload) {
      state.taskId = payload
    }
  },
  getters: {
    getTaskList (state) {
      return state.taskList
    },
    getTaskById (state) {
      return state.taskList.find(el => el.id === state.taskId)
    }
  },
  actions: {
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
    appStatus
  }
})
