import Vue from 'vue';
import VueRouter from 'vue-router';
import PaginaInicio from './components/Inicio.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';


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
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
