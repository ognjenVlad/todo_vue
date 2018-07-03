<template>
	<div align="center">
		<input
			autofocus autocomplete="off"
			placeholder="What needs to be done?"
			v-model="task.text">
		<div>
			Priority:
			<select style="margin: 10px;" v-model="task.priority">
				<option v-for="option in options" v-bind:key="option">
					{{ option }}
				</option>
			</select>
			<div>
				<button style="width:30%" @click="store()">Add task</button>
			</div>
			<p>
				<b style="color:red" id="errors"></b>
			</p>
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
import axios from 'axios';
import { taskService } from '../js/TaskService.js';

export default {
  data () {
	  return {
		  task: {},
		  options: [
			  'low',
			  'medium',
			  'high'
		  ]
	  }
  },

  methods: {
		
	  store () {
		  if (!this.task.text || !this.task.priority) {
				document.getElementById("errors").innerText = "Fields cant be empty"
			  return;
			} else { 
				document.getElementById("errors").innerText = ""
			}
			taskService.addTask(this.task)
				.then(d => {
			  	this.$emit('add',new Task(d['data']["task"]))
		  	});
	  }
  }
}
</script>