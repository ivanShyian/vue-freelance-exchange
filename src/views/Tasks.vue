<template>
  <h1 class="text-white center" v-if="loading">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
    <div class="card" v-for="task in taskList" :key="task.id">
      <h2 class="card-title">
        {{ task.name }}
        <AppStatus :id="task.id"/>
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline }}
          </small>
        </strong>
      </p>
      <div class="buttons-container">
        <router-link :to="'/task/' + task.id" v-slot="{navigate}">
          <button class="btn primary" @click="navigate">Посмотреть</button>
        </router-link>
        <button class="btn danger" @click="deleteTask(task.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'
import { computed, watch } from 'vue'

export default {
  setup () {
    const store = useStore()
    const taskList = computed(() => store.getters.getTaskList)
    const activeTasks = computed(() => store.getters.activeCount)
    store.commit('tasks/toggleLoading', true)
    store.dispatch('database/getData')
      .then(() => store.dispatch('pushTaskList'))

    if (taskList.value.length) {
      store.commit('tasks/toggleLoading', false)
    }
    watch(taskList.value, (newV) => {
      if (newV) {
        store.commit('tasks/toggleLoading', false)
      }
    })
    return {
      taskList,
      activeTasks,
      loading: computed(() => store.getters['tasks/getLoadingStatement']),
      deleteTask: (idx) => {
        store.dispatch('database/deleteTask', idx)
        store.commit('deleteTask', idx)
      }
    }
  },
  components: {
    AppStatus
  }
}
</script>
