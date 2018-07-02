
import Vue from 'vue'
import App from './App'
import login from './components/Login.vue';
import register from './components/Register.vue';
import list from './components/List.vue';
import router from './router/index.js';

Vue.config.productionTip = false
Vue.use( router );

new Vue({
  el: '#app',
  router,
  components: { App , login, register, list},
  template: '<App/>',
  
})
