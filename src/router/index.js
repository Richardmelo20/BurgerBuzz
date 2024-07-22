import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/pageDefault.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/ordersList',
      name: 'pedidos',
      component: () => import(/*webpackChunkName: "pedidos" */ '../views/ordersList.vue')
    }
  ]
})

export default router
