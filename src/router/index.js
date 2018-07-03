import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue';
import register from '../components/Register.vue';
import list from '../components/List.vue';

Vue.use(Router)

export default new Router({
  routes : [
    { 
      path: '/login', component: login ,
      beforeEnter:(to, from, next) => {
        if(localStorage.getItem('token')!=='null'){
          next({path: '/'})
          return;
        }
        next();
      }
    },

    { 
      path: '/register', component: register ,
      beforeEnter:(to, from, next) => {
        if(localStorage.getItem('token')!=='null'){
          next({path: '/'})
          return;
        }
        next();
      }
    },

    { 
      path: '/', component: list , 
      beforeEnter:(to, from, next) => {
        if(localStorage.getItem('token')==='null'){
          next({path: '/login'})
        }
        next();
      }
    }
  ]
})
