// src/router/routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import PaginaInicio from './components/Inicio.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import AgendaMedico from './components/AgendaMedico.vue'; // Importa el nuevo componente

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: PaginaInicio,
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: CreacionUsuarios,
  },
  {
    path: '/agenda-medico', // Nueva ruta para Agenda Médico
    name: 'AgendaMedico',
    component: AgendaMedico,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
