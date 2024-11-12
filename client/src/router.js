// src/router/routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import PaginaInicio from './components/Inicio.vue';
import CreacionUsuarios from './components/CreacionUsuarios.vue';
import GestionDepartamentos from './components/GestionDepartamentos.vue'; 
import PaginaError from './components/PaginaError.vue';
import PaginaEnDesarrollo from './components/PaginaEnDesarrollo.vue';
import SaludoUsuario from './components/Saludo.vue';

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
    name: 'PaginaEnDesarrollo',
    component: PaginaEnDesarrollo,
  },
  {
    path: '/especialidades',
    name: 'GestionDepartamentos',
    component: GestionDepartamentos,
  },

  {
    path: '/login',
    name: 'PaginaEnDesarrollo',
    component: PaginaEnDesarrollo,
  },
  {
    path: '/saludo',
    name: 'SaludoUsuario',
    component: SaludoUsuario,
  },
  {
    path: '/aseguradoras',
    name: 'PaginaEnDesarrollo',
    component: PaginaEnDesarrollo,
  },
  {
    path: '*', // Ruta comodín para capturar rutas no existentes
    name: 'PaginaError',
    component: PaginaError,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
