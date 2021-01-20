<template>
  <span :class="taskClass">{{ taskStatus.name }}</span>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  // Через props мне постоянно возвращалось undefined
  // Так и не понял причину такого поведения
  // Потому сделал через context.attrs
  setup (props, context) {
    const store = useStore()
    const { type, id } = context.attrs
    store.commit('taskStatus/setTaskStatus', { type, id })
    const taskStatus = computed(() => store.getters['taskStatus/getStatus'].find(el => el.id === id))
    return {
      taskStatus: taskStatus.value,
      taskClass: computed(() => {
        return ['badge', {
          primary: taskStatus.value.type === 'active' || taskStatus.value.type === 'pending',
          warning: taskStatus.value.type === 'cancelled',
          danger: taskStatus.value.type === ''
        }]
      })
    }
  }
}
</script>
