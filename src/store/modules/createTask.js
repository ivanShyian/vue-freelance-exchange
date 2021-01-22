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
    id () {
      return Math.random().toString(36).substr(2, 9)
    },
    isDone ({ deadline }) {
      return Date.parse(deadline) < Date.now() ? 'done' : 'active'
    },
    hasValue ({ name, description, deadline }) {
      return name.length && description.length && deadline.length
    },
    getTask ({ task }) {
      return task
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
    createTask ({ state: { task, ...other }, getters: { id, isDone }, commit }) {
      commit('mutateTask', {
        id,
        type: isDone,
        ...other
      })
    }
  }
}
