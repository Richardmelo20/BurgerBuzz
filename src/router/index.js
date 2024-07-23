import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/pedidis',
      name: 'pedidos',
      component: () => import(/*webpackChunkName: "pedidos" */ '../views/pedidos.vue')
    }
  ]
});

export default router;
