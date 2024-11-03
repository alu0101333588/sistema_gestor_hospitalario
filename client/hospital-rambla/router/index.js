// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '@/components/Inicio.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
