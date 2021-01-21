import { createStore } from 'vuex'
import createTask from './modules/createTask'
import task from './modules/task'
import appStatus from './modules/appStatus'

export default createStore({
  state () {
    return {
      taskList: []
    }
  },
  mutations: {
    createTaskList ({ taskList }, payload) {
      taskList.push(payload)
    }
  },
  getters: {
    getTaskList (state) {
      return state.taskList
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
