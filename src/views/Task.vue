<template>
  <div class="card" v-if="task">
    <h2>{{ task.name }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :id="task.id"/>
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">Взять в работу</button>
      <button class="btn primary">Завершить</button>
      <button class="btn danger">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ idx }}</strong> нет.
  </h3>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppStatus from '../components/AppStatus'

export default {
  setup () {
    const route = useRoute()
    const store = useStore()
    store.dispatch('task/setTaskAndId', route.params.taskID)
    const changeStatus = (status) => {
      store.commit('task/changeStatus', status)
      console.log(store.state.task)
    }
    return {
      task: computed(() => store.getters['task/getCurrentTask']),
      idx: computed(() => store.getters['task/getCurrentId']),
      changeStatus
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>
