import { createStore } from 'vuex'
import createTask from './modules/createTask'
import task from './modules/task'

export default createStore({
  state () {
    return {
      taskList: []
    }
  },
  mutations: {
    createTaskList ({ taskList, taskListId }, payload) {
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
    task
  }
})
