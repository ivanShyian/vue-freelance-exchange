export default {
  namespaced: true,
  state () {
    return {
      currentId: null,
      tasks: []
    }
  },
  getters: {
    getCurrentId (state) {
      return state.currentId
    },
    getCurrentTask (state) {
      return state.tasks.find(el => el.id === state.currentId)
    }
  },
  mutations: {
  },
  actions: {
    getTasks (context, payload) {
      context.state.currentId = payload
      context.state.tasks = context.rootState.taskList
    }
  }
}
