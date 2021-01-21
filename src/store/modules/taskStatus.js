export default {
  namespaced: true,
  state () {
    return {
      taskList: [],
      currentId: null
    }
  },
  getters: {
    getStatusName (state) {
      const type = state.taskList.find(el => el.id === state.currentId).type
      if (type === 'cancelled') {
        return 'Отменено'
      } else if (type === 'done') {
        return 'Выполнено'
      } else if (type === 'pending') {
        return 'Выполняется'
      } else {
        return 'Активно'
      }
    },
    getStatusType (state) {
      const type = state.taskList.find(el => el.id === state.currentId).type
      return ['badge', {
        warning: type.type === 'cancelled',
        primary: type.type === 'active',
        danger: type.type === ''
      }]
    }
  },
  actions: {
    someShit (context, payload) {
      context.state.currentId.push(payload)
      context.state.taskList = context.rootState.taskList
    }
  }
}
