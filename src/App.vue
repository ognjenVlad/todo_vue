
<style>
  @import './assets/stil.css';
</style>
<template>
    <div id="app">
        <div class="heading">
            <h1>Todo list</h1>
        </div>
        <ul class="list-group">
        <crud
          v-for="crud in cruds"
          v-bind="crud"
          :key="crud.id"
          @delete="del"
        >
        </crud>
        </ul>
        <div>
            <button @click="create()">Add</button>
        </div>
    </div>
</template>

<script>

    function Crud({ priority, text, name}) {
      this.priority = priority;
      this.text = text;
      this.name = name;
    }
    import axios from 'axios';
    
    import crud from './components/crud.vue';
    export default {
      data() {
        return {
          cruds: [],
          options:[]
        }
      },
      methods: {
        create() {
          axios.get('http://127.0.0.1:8000/api/task/create').then(({ data }) => {
            this.cruds.push(new Crud(data));
         });
        },
        read() {
          axios.get('http://127.0.0.1:8000/api/task').then(({ data }) => {
            var index;
            console.log(data['tasks']);
            for (index = 0; index < data['tasks'].length; ++index) {
              
              this.cruds.push(new Crud(data['tasks'][index]));
         
            }
            
          });
        },
        update(name, text) {
          axios.put('http://127.0.0.1:8000/api/task${name}', { text }).then(() => {
      
            this.cruds.find(crud => crud.name === name).text = text;
          });
        },
        del(name) {
          axios.delete(`http://127.0.0.1:8000/api/task/${name}`).then(() => {
            let index = this.cruds.findIndex(crud => crud.name === name);
            this.cruds.splice(index, 1);
          });
        }
      },
      components: {
        crud
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
