import '@mdi/font/css/materialdesignicons.css'; // Importa los iconos de MDI
import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router que configuraste
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', // Usa Material Design Icons
    },
  }),
  router,
  render: h => h(App),
}).$mount('#app');