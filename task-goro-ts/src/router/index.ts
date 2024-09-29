import { createRouter, createWebHistory } from 'vue-router'
import DataTable from '@/views/DataTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"data-table",
      component: DataTable,
    }
  ]
})

export default router
