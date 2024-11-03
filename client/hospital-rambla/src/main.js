import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import Inicio from '../components/Inicio.vue';
import router from './router'


createApp(App).use(router).use(vuetify).mount('#app')

// Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
  },
  // Otras rutas pueden ir aquí
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;