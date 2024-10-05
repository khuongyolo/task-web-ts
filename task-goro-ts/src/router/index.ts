import { createRouter, createWebHistory } from 'vue-router';
import DataTable from '@/views/DataTable.vue';
import EditDataDialog from '@/views/EditDataDialog.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"data-table",
      component: DataTable,
    },
    {
      path:"/edit/:id",
      name:"edit-data-id",
      component: EditDataDialog,
    }
  ]
})

export default router
