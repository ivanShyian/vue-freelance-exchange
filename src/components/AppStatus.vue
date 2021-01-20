<template>
  <span :class="taskClass">{{ taskStatus.name }}</span>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  // Через props мне постоянно возвращалось undefined
  // Так и не понял причину такого поведения
  setup (props, context) {
    const store = useStore()
    const {
      type,
      id
    } = context.attrs
    store.commit('setTaskStatus', {
      type,
      id
    })
    const taskStatus = computed(() => store.getters.getStatus.find(el => el.id === id))
    const taskClass = computed(() => {
      return ['badge', {
        warning: taskStatus.value.type === 'cancelled',
        primary: taskStatus.value.type === 'active'
      }]
    })
    return {
      taskStatus: taskStatus.value,
      taskClass: taskClass.value
    }
  }
}
</script>
