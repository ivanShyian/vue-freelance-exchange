import { createStore } from 'vuex'
import createTask from './modules/createTask'
import taskStatus from './modules/taskStatus'
import task from './modules/task'

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
  actions: {},
  modules: {
    createTask,
    taskStatus,
    task
  }
})
