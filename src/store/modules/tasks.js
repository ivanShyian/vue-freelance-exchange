export default {
  namespaced: true,
  state () {
    return {
      loading: false
    }
  },
  getters: {
    getLoadingStatement (state) {
      return state.loading
    }
  },
  mutations: {
    toggleLoading (state, payload) {
      state.loading = payload
    }
  }
}
