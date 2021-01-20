export default {
  namespaced: true,
  state () {
    return {
      name: '',
      deadline: '',
      description: '',
      taskList: []
    }
  },
  getters: {
    id () {
      return Math.random().toString(36).substr(2, 9)
    },
    isDone (state) {
      return Date.parse(state.deadline) < Date.now() ? 'done' : 'active'
    },
    hasValue (state) {
      return state.name.length && state.description.length && state.deadline.length
    }
  },
  mutations: {
    setValues (state, {
      value,
      name
    }) {
      state[name] = value
    },
    clearValues (state) {
      state.name = ''
      state.deadline = ''
      state.description = ''
    }
  },
  actions: {
    addNewTask (context) {
      const {
        hasValue,
        isDone,
        id
      } = context.getters
      const {
        name,
        deadline,
        description,
        taskList
      } = context.state
      if (hasValue) {
        const type = isDone
        taskList.push({ id, type, name, deadline, description })
        context.commit('clearValues')
      }
    }
  }
}
