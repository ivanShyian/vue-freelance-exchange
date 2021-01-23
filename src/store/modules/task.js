export default {
  namespaced: true,
  state () {
    return {
      currentId: null,
      loading: false,
      task: {}
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    },
    doTaskMutation (state, payload) {
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
    setTask ({ commit, rootGetters }, payload) {
      const task = rootGetters.getTaskList.find(el => el.id === payload)
      commit('doTaskMutation', task)
      commit('setTaskId', payload)
    }
  }
}
