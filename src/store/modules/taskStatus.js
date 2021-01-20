export default {
  namespaced: true,
  state () {
    return {
      taskStatus: []
    }
  },
  getters: {
    getStatus (state) {
      return state.taskStatus
    },
    getClass (state) {
      return state.taskStatus
    }
  },
  mutations: {
    setTaskStatus (state, { type, id }) {
      let name = null
      if (type === 'cancelled') {
        name = 'Отменено'
      } else if (type === 'done') {
        name = 'Выполнено'
      } else if (type === 'pending') {
        name = 'Выполняется'
      } else {
        name = 'Активно'
      }
      state.taskStatus.push({ name, type, id })
    }
  }
}
