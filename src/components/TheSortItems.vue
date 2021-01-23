<template>
  <div class="form-control">
    <button :class="['btn', {primary: id === active}]"
            v-for="(btn, id) in buttons"
            :disabled="!taskList"
            @click="chooseFilter(id, btn.type)"
            :key="btn">
      {{ btn.name }}
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onUnmounted } from 'vue'

export default {
  setup () {
    const store = useStore()
    onUnmounted(() => {
      store.commit('sortItems/changeCount', 0)
      store.commit('setFilter', 'all')
    })
    return {
      buttons: computed(() => store.getters['sortItems/getButtons']),
      active: computed(() => store.getters['sortItems/getActiveNumber']),
      taskList: computed(() => store.getters.getFullTaskList.length),
      chooseFilter: (id, type) => {
        store.commit('sortItems/changeCount', id)
        store.commit('setFilter', type)
      }
    }
  }
}
</script>

<style scoped lang="scss">
div.form-control {
  max-width: 9rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 20%;
  left: 0;
  @media (max-height: 400px) {
    top: 5rem
  }

  button.btn {
    font-family: "JetBrains Mono", sans-serif;
    font-size: .9rem;
    padding: .6rem .9rem;
    text-transform: capitalize;
    width: 100%;
    border-radius: 0;
    margin: 0;
  }

  button.btn:first-child {
    border-top-left-radius: 1rem;
  }

  button.btn:last-child {
    border-bottom-right-radius: 1rem;
  }
}
</style>
