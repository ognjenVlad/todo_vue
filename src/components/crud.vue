<template>
 <div>
    <li class="list-group-item" v-show="!isEditing">
      Task {{name}}:  
      <label>{{ text }}</label>
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
      <div class='field'>
        <input type='text' v-model="changedText" >
      </div>
      <div class='ui two button attached buttons'>
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
      };
    },
 
  methods: {
    update (val) {
      this.isEditing = false;
      this.$emit('update', this.name, this.changedText)
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
