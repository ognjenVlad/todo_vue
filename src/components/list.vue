<style>
  @import '../assets/stil.css';
</style>

<template>
  
  <div >
      
    <CreateTodo @add="store"></CreateTodo>
    
    <div v-if="loggedIn!=='null'" id="app">
      <button align="right" type="button" v-on:click="logout()">Logout</button>
      <div class="heading">
          <h1>Todo list</h1>
      </div>
      <ul class="list-group">
      <crud
        v-for="crud in cruds"
        v-bind="crud"
        :key="crud.id"
        @delete="del"
        @update="update"
      >
      </crud>
      </ul>
    </div>
  </div>
</template>

<script>

    function Crud({ priority, text, id, completed}) {
        this.priority = priority;
        this.text = text;
        this.id = id;
        this.completed = completed;
    }
    import crud from './crud.vue';
    import service from '../js/TaskService.js';
    import logService from '../js/LoginService.js';
    import CreateTodo from './CreateTodo.vue';
    export default {
      data() {
        return {
          newTodo: {},
          newText: null,
          cruds: [],
          priority:'',
          errors:false,
          loggedIn:localStorage.getItem('token'),
          
        }
      },
      methods: {
        store(task) {
            this.cruds.push(task);
        },
        read() {
          service.getAll(this.cruds).then((valid) => {
            if (!valid){
              this.$router.replace('/login');
            }
          });
          console.log("GRESKE:" + this.errors);
        },
        update(id, text, priority, completed) {
          service.updateTask(id,text, priority, completed, this.cruds);
        },
        del(id) {
          service.delTask(id, this.cruds);
        },
        logout() {
          logService.logout().then(() => {
            
            this.loggedIn = 'null';
            this.$router.replace('/login');
          });
        },
        
      },
      components: {
        crud,CreateTodo
      },
      
      created() {
        
        this.read();
      }
  }
    
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>
