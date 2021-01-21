// Очень долго пытался запихнуть весь AppStatus сюды.
// На это ушло безумное кол-во времени и сил..
// Я понимаю, что каждый раз, когда экшн снизу вызывается - обьект таск перезаписывается, но решение я не нашел..
/**
export default {
  namespaced: true,
  state () {
    return {
      task: {}
    }
  },
  getters: {
    getCurrentTask (state) {
      return state.task
    },
    getName ({ task }) {
      if (task.type === 'cancelled') {
        return 'Отменено'
      } else if (task.type === 'done') {
        return 'Выполнено'
      } else if (task.type === 'pending') {
        return 'Выполняется'
      } else {
        return 'Активно'
      }
    },
    getType ({ task }) {
      return ['badge', {
        primary: task.type === 'pending' || task.type === 'active',
        danger: task.type === 'cancelled',
        '': task.type === 'done'
      }]
    }
  },
  mutations: {

  },
  actions: {
    setTask (context, payload) {
      context.state.task = context.rootGetters.getTaskList.find(el => el.id === payload)
    }
  }
}
**/
