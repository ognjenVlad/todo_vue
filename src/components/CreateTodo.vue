<template>
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
			<p>
				<b style="color:red" id="errors"></b>
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
import { taskService } from '../js/TaskService.js';
export default {
  data () {
	  return {
		  newText: null,
		  priority:'',
		  options: [
			  'low',
			  'medium',
			  'high'
		  ]
	  }
  },

  methods: {
		
	  store () {
		  if (!this.newText || !this.priority) {
				document.getElementById("errors").innerText = "Fields cant be empty"
			  return;
			} else { 
				document.getElementById("errors").innerText = ""
			}
			taskService.addTask(this.newText, this.priority)
				.then(d => {
			  	this.$emit('add',new Crud(d['data']["task"]))
		  	});
	  }
  }
}
</script>