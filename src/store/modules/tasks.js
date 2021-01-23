export default {
  namespaced: true,
  state () {
    return {
      loading: false
    }
  },
  getters: {
    getLoadingStatus (state) {
      return state.loading
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    }
  }
}
