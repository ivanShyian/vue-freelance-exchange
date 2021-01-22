export default {
  namespaced: true,
  state () {
    return {
      data: []
    }
  },
  getters: {
    getDatabaseData (state) {
      return state.data
    }
  },
  actions: {
    async submitData (context, payload) {
      try {
        await fetch('https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getData (context) {
      try {
        const res = await fetch('https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance.json', {
          method: 'GET'
        })
        if (!res.ok) {
          throw new Error('Cannot get data. Just try do add new task')
        }
        const body = await res.json()
        context.state.data = Object.keys(body).map(el => {
          return {
            ...body[el],
            id: el
          }
        })
      } catch (e) {
        console.log(e.message)
      }
    },
    async changeStatus (context) {
      try {
        await fetch('https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance.json', {
          method: 'DELETE'
        }).then(() => context.rootGetters.getTaskList.forEach(el => context.dispatch('submitData', el)))
        // get
      } catch (e) {
        console.log(e)
      }
    },
    async deleteTask (context, payload) {
      try {
        await fetch(`https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance/${payload}.json`, {
          method: 'DELETE'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
