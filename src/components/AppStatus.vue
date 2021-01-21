<template>
  <span :class="taskType">{{ taskName }}</span>
</template>
<script>
import { computed } from 'vue'
export default {
  props: ['id', 'type'],
  setup (props) {
    const type = computed(() => props.type)
    return {
      taskName: computed(() => {
        if (type.value === 'cancelled') {
          return 'Отменено'
        } else if (type.value === 'done') {
          return 'Выполнено'
        } else if (type.value === 'pending') {
          return 'Выполняется'
        } else {
          return 'Активно'
        }
      }),
      taskType: computed(() => {
        return ['badge', {
          warning: type.value === 'cancelled',
          primary: type.value === 'active',
          danger: type.value === ''
        }]
      })
    }
  }
}
</script>
