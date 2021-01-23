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
    },
    setTaskMutation (state, payload) {
      state.task = payload
    },
    setTaskId (state, payload) {
      state.currentId = payload
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
      const task = context.rootGetters.getTaskList.find(el => el.id === payload) // can be undef
      context.commit('setTaskMutation', task)
      context.commit('setTaskId', payload)
    }
  }
}
