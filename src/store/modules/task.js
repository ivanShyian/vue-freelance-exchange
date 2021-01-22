export default {
  namespaced: true,
  state () {
    return {
      currentId: null,
      task: {},
      loading: false
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    }
  },
  getters: {
    getCurrentTask (state) {
      return state.task
    },
    getCurrentId (state) {
      return state.currentId
    },
    getLoadingStatus (state) {
      return state.loading
    }
  },
  actions: {
    setTask (context, payload) {
      context.state.task = context.rootGetters.getTaskList.find(el => el.id === payload) // can be undef
      context.state.currentId = payload
    }
  }
}
