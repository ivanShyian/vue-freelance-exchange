<template>
  <span :class="taskType">{{ taskName }}</span>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: ['id'],
  setup (props) {
    const store = useStore()
    const idx = computed(() => props.id).value
    const taskList = computed(() => store.getters.getTaskList).value
    const task = taskList.find(el => el.id === idx)
    return {
      taskName: computed(() => {
        if (task.type === 'cancelled') {
          return 'Отменено'
        } else if (task.type === 'done') {
          return 'Выполнено'
        } else if (task.type === 'inprocess') {
          return 'Выполняется'
        } else {
          return 'Активно'
        }
      }),
      taskType: computed(() => {
        return ['badge', {
          primary: task.type === 'inprocess' || task.type === 'active',
          danger: task.type === 'cancelled',
          '': task.type === 'done'
        }]
      })
    }
  }
}
</script>
