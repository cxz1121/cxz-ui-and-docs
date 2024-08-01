import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/cxz-table'
    },
    {
      path: '/cxz-button',
      name: 'cxzButton',
      component: () => import('@cxz-ui/demo/cxz-button.vue')
    },
    {
      path: '/cxz-table',
      name: 'cxzTable',
      component: () => import('@cxz-ui/demo/cxz-table.vue')
    }
  ]
})

export default router