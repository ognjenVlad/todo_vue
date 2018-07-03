<style>
  @import '../assets/stil.css';
</style>

<template>
  <div >
    <CreateTask @add="store"></CreateTask>
    <div>
      <button align="right" type="button" v-on:click="logout()">Logout</button>
      <div class="heading">
				<h1>Todo list</h1>
      </div>
      <ul class="list-group">
        <task
          v-for="task in tasks"
          v-bind="task"
          :key="task.id"
          @delete="del"
          @update="update">
        </task>
      </ul>
    </div>
  </div>
</template>

<script>
function Task({ priority, text, id, completed}) {
  this.priority = priority;
  this.text = text;
  this.id = id;
  this.completed = completed;
}
import task from './Task.vue';
import { taskService } from '../js/TaskService.js';
import { loginService } from '../js/LoginService.js';
import CreateTask from './CreateTask.vue';

export default {
  data () {
    return {
      tasks: [],
    }
	},
	
  methods: {

    store (task) {
			this.tasks.push(task);
    },

    read () {
      taskService.getAll()
        .then(({ data }) => {
          var index;
          for (index = 0; index < data.length; ++index) {
            this.tasks.push(new Task(data[index]));   
          }
        })
        .catch(error => {
          this.$router.replace('/login');
        }); 
    },

    update (id, text, priority, completed) {
      taskService.updateTask(id, text, priority, completed)
        .then(() => {
          this.tasks.find(task => task.id === id).text = text;
          this.tasks.find(task => task.id === id).priority = priority;
      });
    },

    del (id) {
      taskService.delTask(id)
        .then(() => {
          let index = this.tasks.findIndex(task => task.id === id);
          this.tasks.splice(index, 1);
      });
    },

    logout () {
      loginService.logout().then(() => {
        this.$router.replace('/login');
      });
    }
  },

  components: {
    task, CreateTask
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
