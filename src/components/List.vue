<style>
  @import '../assets/stil.css';
</style>

<template>
  <div >
    <CreateTodo @add="store"></CreateTodo>
    <div>
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
          @update="update">
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
import crud from './Crud.vue';
import { taskService } from '../js/TaskService.js';
import { loginService } from '../js/LoginService.js';
import CreateTodo from './CreateTodo.vue';

export default {
  data () {
    return {
      cruds: [],
    }
	},
	
  methods: {

    store (task) {
			this.cruds.push(task);
    },

    read () {
      taskService.getAll(this.cruds).then((valid) => {
        if (!valid) {
          this.$router.replace('/login');
        }
      });
    },

    update (id, text, priority, completed) {
      taskService.updateTask(id, text, priority, completed, this.cruds);
    },

    del (id) {
      taskService.delTask(id, this.cruds);
    },

    logout () {
      loginService.logout().then(() => {
        this.$router.replace('/login');
      });
    }
  },

  components: {
    crud, CreateTodo
  },

  created () {
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
