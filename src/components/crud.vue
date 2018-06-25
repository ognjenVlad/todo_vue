<template>
 <div>
    <li class="list-group-item" v-show="!isEditing">
      <input type="checkbox" v-model="todo.completed">
      <p>Task {{name}}:  
      <label>    {{ text }}</label>
      </p>
       Priority: 
      <label>    {{ priority }}</label>
      <div align="right">
        <button @click="del">Delete</button>
        <button v-on:click="showForm">Update</button>
      </div>
    </li>
 
  <div v-show="isEditing">
    <div class='ui form'>
      <div class='field'>
        <label>Task {{name}}</label>
      </div>
      Text:
      <div style="margin: 10px;" class='field'>
        <input type='text' v-model="changedText" >
      </div>
      Priority:
      <div style="margin: 10px;"  class='field'>
        <input type='text' v-model="priorityText" >
      </div>
      <div style="margin: 10px;"  class='ui two button attached buttons'>
        <button class='ui basic blue button' @click="update">
          Update
        </button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
      return {
        isEditing: false,
        changedText: this.text,
        priorityText: this.priority,
      };
    },
 
  methods: {
    update (val) {
      this.isEditing = false;
      this.$emit('update', this.name, this.changedText, this.priorityText)
    },
    del () {
      this.$emit('delete', this.name)
    },
    showForm() {
      this.isEditing = true;
    },
  },
  props: ['name', 'text', 'priority']
}
</script>
