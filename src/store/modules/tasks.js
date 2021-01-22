export default {
  namespaced: true,
  state () {
    return {
      currentId: null,
      loading: true,
      task: {}
    }
  },
  getters: {
    getCurrentId (state) {
      return state.currentId
    },
    getCurrentTask (state) {
      return state.task
    },
    getLoadingStatement (state) {
      return state.loading
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setTask (context, payload) {
      context.state.task = context.rootGetters.getTaskList.find(el => el.id === payload) // id
      context.state.currentId = payload
    }
  }
}
