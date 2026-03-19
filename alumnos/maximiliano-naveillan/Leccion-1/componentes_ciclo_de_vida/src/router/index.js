import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeViews.vue'),
  },
  {
    path: '/producto/:id',
    name: 'detalle',
    component: () => import('../views/ProductoDetalle.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
