<template>
  <form class="card" @submit.prevent="addNewTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" :value="name" @input="setName($event.target.value, 'name')">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" :value="deadline" @input="setName($event.target.value, 'deadline')">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" :value="description" @input="setName($event.target.value, 'description')"></textarea>
    </div>

    <button class="btn primary" :disabled="!hasValue">Создать</button>
  </form>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup: function () {
    const store = useStore()
    return {
      name: computed(() => store.state.newTask.name),
      deadline: computed(() => store.state.newTask.deadline),
      description: computed(() => store.state.newTask.description),
      setName: (event, name) => store.commit('newTask/setValues', { value: event, name }),
      setDeadline: (event, name) => store.commit('newTask/setValues', { value: event, name }),
      setDescription: (event, name) => store.commit('newTask/setValues', { value: event, name }),
      hasValue: computed(() => store.getters['newTask/hasValue']),
      addNewTask: () => {
        store.dispatch('newTask/createTask')
        store.commit('setLocalList', store.getters['newTask/getTask'])
        store.dispatch('database/submitData', store.getters['newTask/getTask'])
        store.commit('newTask/clearValues')
      }
    }
  }
}
</script>
