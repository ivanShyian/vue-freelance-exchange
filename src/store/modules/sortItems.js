export default {
  namespaced: true,
  state () {
    return {
      active: 0,
      buttons: [
        { id: 0, name: 'Все', type: 'all' },
        { id: 1, name: 'Активные', type: 'active' },
        { id: 1, name: 'В работе', type: 'inprocess' },
        { id: 2, name: 'Выполненные', type: 'done' },
        { id: 3, name: 'Отмененные', type: 'cancelled' }]
    }
  },
  getters: {
    getButtons (state) {
      return state.buttons
    },
    getActiveNumber (state) {
      return state.active
    },
    getActiveStatus (state) {
      return state.buttons.find(el => el.id === state.active)
    }
  },
  mutations: {
    changeCount (state, payload) {
      state.active = payload
    }
  }
}
