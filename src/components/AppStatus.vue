<template>
  <span :class="taskType">{{ taskName }}</span>
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
      id
    } = context.attrs
    store.dispatch('taskStatus/someShit', id)
    return {
      taskName: computed(() => store.getters['taskStatus/getStatusName']),
      taskType: computed(() => store.getters['taskStatus/getStatusType'])
    }
  }
}
</script>
