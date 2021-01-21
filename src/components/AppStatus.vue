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
    // store.dispatch('appStatus/setTask', computed(() => props.id).value)
    // watch(taskList, (newV, oldV) => {
    //   store.dispatch('appStatus/setTask', computed(() => props.id).value)
    // })
    const idx = computed(() => props.id).value
    const taskList = computed(() => {
      return store.getters.getTaskList
    })
    const task = taskList.value.find(el => {
      return el.id === idx
    })
    return {
      taskName: computed(() => {
        if (task.type === 'cancelled') {
          return 'Отменено'
        } else if (task.type === 'done') {
          return 'Выполнено'
        } else if (task.type === 'pending') {
          return 'Выполняется'
        } else {
          return 'Активно'
        }
      }),
      taskType: computed(() => {
        return ['badge', {
          primary: task.type === 'pending' || task.type === 'active',
          danger: task.type === 'cancelled',
          '': task.type === 'done'
        }]
      })
    }
  }
}
</script>
