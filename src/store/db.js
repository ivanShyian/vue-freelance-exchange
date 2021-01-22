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
      console.log(payload)
      await fetch('https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    },
    async getData (context) {
      const res = await fetch('https://vue-freelance-d8f13-default-rtdb.europe-west1.firebasedatabase.app/freelance.json', {
        method: 'GET'
      })
      const body = await res.json()
      context.state.data = Object.keys(body).map(el => {
        return {
          ...body[el],
          id: el
        }
      })
    }
  }
}
