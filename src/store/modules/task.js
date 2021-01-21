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
  actions: {
    setTask (context, payload) {
      context.state.task = context.rootGetters.getTaskList.find(el => el.id === payload) // id
      context.state.currentId = payload
    }
  }
}
