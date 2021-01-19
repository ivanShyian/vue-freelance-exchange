import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks'
import New from '@/views/New'
import Task from '@/views/Task'
import NotFound from '@/views/NotFound'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Tasks,
      name: 'home',
      alias: '/'
    },
    {
      path: '/create',
      component: New
    },
    {
      path: '/task-details',
      component: Task
    },
    { path: '/:notFound(.*)', component: NotFound }],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
