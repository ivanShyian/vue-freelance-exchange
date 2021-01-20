<template>
  <div class="card" v-if="task">
    <h2>{{ task.name }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :type="task.type"/>
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus">Взять в работу</button>
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
    store.dispatch('task/getTasks', route.params.taskID)
    const changeStatus = () => { }
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
