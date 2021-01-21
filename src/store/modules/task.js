export default {
  namespaced: true,
  state () {
    return {
      currentId: null,
      task: {}
    }
  },
  getters: {
    getCurrentId (state) {
      return state.currentId
    },
    getCurrentTask (state) {
      return state.task
    }
  },
  mutations: {
    changeStatus (state, payload) {
      state.task.type = payload
    }
  },
  actions: {
    setTaskAndId (context, payload) {
      context.state.currentId = payload
      context.state.task = context.rootState.taskList.find(el => el.id === payload)
    }
  }
}
