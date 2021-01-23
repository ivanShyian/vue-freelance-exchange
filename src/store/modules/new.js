export default {
  namespaced: true,
  state () {
    return {
      name: '',
      deadline: '',
      description: '',
      task: {}
    }
  },
  getters: {
    isDone (state) {
      return Date.parse(state.deadline) < Date.now() ? 'done' : 'active'
    },
    hasValue ({ name, description, deadline }) {
      return name.length && description.length && deadline.length
    },
    getTask (state) {
      return state.task
    }
  },
  mutations: {
    setValues (state, { value, name }) {
      state[name] = value
    },
    clearValues (state) {
      state.name = ''
      state.deadline = ''
      state.description = ''
    },
    mutateTask (state, payload) {
      state.task = payload
    }
  },
  actions: {
    createTask ({ state: { task, ...other }, getters: { isDone }, commit }) {
      commit('mutateTask', {
        type: isDone,
        ...other
      })
    }
  }
}
