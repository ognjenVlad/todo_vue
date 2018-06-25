
<style>
  @import './assets/stil.css';
</style>

<template>
  <div>
    <div align="center">
      <input
      autofocus autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newText">
      <div>
        Priority:
        <select style="margin: 10px;" v-model="priority">
            <option v-for="option in options" v-bind:key="option">
              {{ option }}
            </option>
        </select>
        <div>
          <button style="width:30%" @click="store()">Add task</button>
        </div>
      <p v-if="errors">
          <b style="color:red">Fields cant be empty</b>
        </p>
      </div>
      
    </div>
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
    import axios from 'axios';
    
    import crud from './components/crud.vue';
    export default {
      data() {
        return {
          newTodo: {},
          newText: null,
          cruds: [],
          options:[],
          priority:'',
          errors:false,
          options: [
            'low',
            'medium',
            'high'
          ]
        }
      },
      methods: {
        store() {
          if(this.newText==null || this.newText=='' || this.priority==''){
            
            this.errors=true;
            return;
          }else{
            this.errors=false;
          }
         
     
          console.log(JSON.stringify(this.newTodo));
          axios.post(`http://127.0.0.1:8000/api/task`, {"text":this.newText,
          "priority":this.priority}).then(({ data }) => {
            console.log(data);
            this.cruds.push(new Crud(data["task"]));
            console.log(this.cruds);
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
        update(id, text, priority, completed) {
          
          axios.put(`http://127.0.0.1:8000/api/task/${id}`, {"text":text, "priority":priority,"completed":completed }).then(() => {
      
            this.cruds.find(crud => crud.id === id).text = text;
            this.cruds.find(crud => crud.id === id).priority = priority;
          });
        },
        del(id) {
          axios.delete(`http://127.0.0.1:8000/api/task/${id}`).then(() => {
            let index = this.cruds.findIndex(crud => crud.id === id);
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
