<template>
  <div class="card" v-if="'currentTask'">
    <h2>{{ 'currentTask.name' }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :type="'type'"/>
    </p>
    <p><strong>Дэдлайн</strong>: {{ 'deadl' }}</p>
    <p><strong>Описание</strong>: {{ 'desc' }}</p>
    <div>
      <button class="btn">Взять в работу</button>
      <button class="btn primary">Завершить</button>
      <button class="btn danger">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ 'id' }}</strong> нет.
  </h3>
</template>

<script>
// import { useRoute } from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  setup () {
    // const route = useRoute()
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>
