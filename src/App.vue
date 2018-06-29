
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import list from './components/list.vue';
  import login from './components/login.vue';
  import register from './components/register.vue';
  export default {
    data(){
      return {
          loggedIn:localStorage.getItem('token'),
        }
    },
    components: {
        list,login,register
    },
   
  }
</script>

  

