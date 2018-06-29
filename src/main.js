// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import login from './components/login.vue';
import register from './components/register.vue';
import list from './components/list.vue';
Vue.config.productionTip = false
import VueRouter from 'vue-router';
Vue.use( VueRouter );


const routes = [
  { path: '/login', component: login ,
    beforeEnter:(to, from, next)=>{
      if(localStorage.getItem('token')!=='null'){
        console.log("AAA");
        next({path: '/'})
        return;
      }
      console.log("NIJE PROSLO");
      next();
    }},
  { path: '/register', component: register ,
      beforeEnter:(to, from, next)=>{
        if(localStorage.getItem('token')!=='null'){
          console.log("AAA");
          next({path: '/'})
          return;
        }
    console.log("NIJE PROSLO");
    next();
  }},
  { path: '/', component: list , 
    beforeEnter:(to, from, next)=>{
      if(localStorage.getItem('token')==='null'){
        next({path: '/login'})
      }
      next();
    }}
]
const router = new VueRouter({
  routes
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App , login, register, list},
  template: '<App/>',
  
})
