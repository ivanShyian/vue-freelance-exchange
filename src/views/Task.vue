<template>
  <div class="card" v-if="!loading && task">
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
  <h3 class="text-white center" v-if="!task && !loading">
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
    store.dispatch('task/setTask', route.params.taskID)
    const idx = computed(() => store.getters['task/getCurrentId']).value
    const task = computed(() => store.getters['task/getCurrentTask'])
    const loading = computed(() => store.getters['task/getLoadingStatus'])

    if (!task.value) { // if page was update
      store.commit('task/toggleLoading', true)
      store.dispatch('database/getData')
        .then(() => store.dispatch('pushTaskList'))
        .then(() => store.dispatch('task/setTask', route.params.taskID))
        .then(() => store.commit('task/toggleLoading', false))
    } else if (task.value) { // if ok
      store.commit('task/toggleLoading', false)
    }

    return {
      idx,
      task,
      loading,
      changeStatus: (status) => {
        store.dispatch('changeStatus', {
          status,
          idx
        })
        store.dispatch('database/changeStatus')
      }
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>
