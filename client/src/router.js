// src/router/routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import PaginaInicio from './components/Inicio.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import AgendaMedico from './components/AgendaMedico.vue';
import GestionDepartamentos from './components/GestionDepartamentos.vue'; 

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
    path: '/agenda-medico', 
    name: 'AgendaMedico',
    component: AgendaMedico,
  },
  {
    path: '/departamentos',
    name: 'GestionDepartamentos',
    component: GestionDepartamentos,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
