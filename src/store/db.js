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
  mutations: {
    doDataMutation (state, payload) {
      state.data = Object.keys(payload).map(el => {
        return {
          ...payload[el],
          id: el
        }
      })
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
        console.warn(e)
      }
    },
    async getData (context) {
      try {
        const res = await fetch('https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance.json', {
          method: 'GET'
        })
        if (!res.ok) {
          throw new Error('Something gone wrong. Just try another time please..')
        }
        const body = await res.json()
        if (!body) {
          throw new Error('Database is empty. Just add new task :)')
        } else {
          await context.commit('doDataMutation', body)
        }
      } catch (e) {
        console.warn(e.message)
      }
    },
    async changeStatus (context, { idx, task }) {
      console.log(task.value)
      try {
        await fetch(`https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance/${idx}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task.value)
        })
      } catch (e) {
        console.warn(e)
      }
    },
    async deleteTask (context, payload) {
      try {
        await fetch(`https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance/${payload}.json`, {
          method: 'DELETE'
        })
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
