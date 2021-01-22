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
      <button class="btn primary" @click="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
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
    const task = computed(() => store.getters['tasks/getCurrentTask'])
    if (!task.value) {
      store.dispatch('database/getData')
        .then(() => store.dispatch('pushTaskList'))
    }
    store.dispatch('tasks/setTask', route.params.taskID)
    const idx = computed(() => store.getters['tasks/getCurrentId']).value
    return {
      idx,
      task,
      changeStatus: (status) => {
        store.dispatch('changeStatus', { status, idx })
      }
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>
