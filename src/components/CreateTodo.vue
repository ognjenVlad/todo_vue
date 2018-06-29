<template>
    <div v-if="loggedIn!=='null'" align="center">
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
</template>
<script>
    function Crud({ priority, text, id, completed}) {
        this.priority = priority;
        this.text = text;
        this.id = id;
        this.completed = completed;
    }
    import axios from 'axios';
    import service from '../js/TaskService.js';
    export default {
        data() {
            return {
            newText: null,
            input: {},
            priority:'',
            errors:false,
            loggedIn:localStorage.getItem('token'),
            options: [
                'low',
                'medium',
                'high'
                ]
            }
        },
        methods:{
            store() {
                if(this.newText==null || this.newText=='' || this.priority==''){
                    this.errors=true;
                    return;
                }else{
                    this.errors=false;
                }
                var data = {};
                service.addTask(this.newText, this.priority).then(d => {
                    console.log(d);
                    this.$emit('add',new Crud(d['data']["task"]))
                });
            },
            
        }
    }
</script>