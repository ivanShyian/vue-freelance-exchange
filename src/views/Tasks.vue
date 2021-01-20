<template>
  <h1 class="text-white center" v-if="!taskList.length">Задач пока нет</h1>
  <h3 class="text-white" v-else>Всего активных задач: 0</h3>
  <div v-if="taskList.length">
    <div class="card" v-for="task in taskList" :key="task.id">
      <h2 class="card-title">
        {{ task.name }}
        <app-status :type="task.type" :id="task.id"></app-status>
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline }}
          </small>
        </strong>
      </p>
      <router-link :to="'/task/' + task.id" v-slot="{navigate}">
        <button class="btn primary" @click="navigate">Посмотреть</button>
      </router-link>
    </div>
  </div>

</template>

<script>
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'
import { computed } from 'vue'

export default {
  setup () {
    const store = useStore()
    return {
      taskList: computed(() => store.getters.getTaskList)
    }
  },
  components: {
    AppStatus
  }
}
</script>
