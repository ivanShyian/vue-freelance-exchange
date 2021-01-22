<template>
  <h1 class="text-white center" v-if="loading">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: 0</h3>
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
      <router-link :to="'/task/' + task.id" v-slot="{navigate}">
        <button class="btn primary" @click="navigate">Посмотреть</button>
      </router-link>
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
    const taskList = computed(() => store.getters.getTaskList).value

    store.dispatch('database/getData')
      .then(() => store.dispatch('pushTaskList'))

    watch(taskList, (newV) => {
      if (newV) {
        store.commit('task/toggleLoading', false)
      }
    })
    return {
      taskList,
      loading: computed(() => store.getters['task/getLoadingStatement'])
    }
  },
  components: {
    AppStatus
  }
}
</script>
