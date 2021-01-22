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
import { computed, watch, onMounted } from 'vue'

export default {
  setup () {
    const store = useStore()
    const taskList = computed(() => store.getters.getTaskList)
    const activeTasks = computed(() => store.getters.activeCount)
    const loading = computed(() => store.getters['tasks/getLoadingStatement'])

    onMounted(() => {
      console.log('>-------------mounted')
      if (taskList.value.length) {
        console.log('>---mounted')
        store.commit('tasks/toggleLoading', false)
      } else {
        console.log('mounted')
        store.commit('tasks/toggleLoading', true)
        store.dispatch('database/getData')
          .then(() => store.dispatch('pushTaskList'))
      }
    })
    watch(taskList.value, (newV) => {
      console.log('watched------------->x')
      if (newV && taskList.value) {
        console.log('watched-->x')
        store.commit('tasks/toggleLoading', false)
      }
    })
    return {
      taskList,
      activeTasks,
      loading,
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
