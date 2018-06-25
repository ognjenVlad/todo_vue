<template>
 <div>
    <li class="list-group-item" v-show="!isEditing">
      <p>
        Completed: <input @click="complete" type="checkbox" v-model="isCompleted">
      </p>
      
      <strike v-show="isCompleted">Task :  
        <label><strike>  {{ text }}</strike> </label>
      </strike>
      <div v-show="!isCompleted">Task : 
        <label>    {{ text }}</label>
      </div>
      <div>
        <strike v-show="isCompleted">Priority: 
          <label><strike>    {{ priority }}</strike></label>
          </strike>
        <div v-show="!isCompleted">Priority: 
          <label>    {{ priority }}</label>
        </div>
      </div>
      <div align="right">
        <button @click="del">Delete</button>
        <button v-show="!isCompleted" v-on:click="showForm">Update</button>
      </div>
    </li>
 
  <div v-show="isEditing">
    <div class='ui form'>
      <div class='field'>
        <label>Task {{id}}</label>
      </div>
      Text:
      
      <div style="margin: 10px;" class='field'>
        <input type='text' v-model="changedText" >
      </div>
      Priority:
      <div>
        <select style="margin: 10px;" v-model="priorityText">
            <option v-for="option in options" v-bind:key="option">
              {{ option }}
            </option>
        </select>
      </div>
      <p  style="margin: 10px;color:red;" v-if="errors">
          <b>Inputs cant be empty</b>
      </p>
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
        errors: false,
        isEditing: false,
        changedText: this.text,
        priorityText: this.priority,
        isCompleted:this.completed,
        options: [
            'low',
            'medium',
            'high'
          ]
      };
    },
 
  methods: {
    update (val) {
      if((this.changedText==null || this.changedText=='')||(this.priorityText==null || this.priorityText=='')){
            
            this.errors=true;
            return;
      }
      this.isEditing = false;
      this.$emit('update', this.id, this.changedText, this.priorityText,this.isCompleted)
    },
    del () {
      this.$emit('delete', this.id)
    },
    showForm() {
      this.isEditing = true;
    },
    complete(){
      this.isCompleted = !this.isCompleted;
      this.$emit('update', this.id, this.changedText, this.priorityText, this.isCompleted)
    }
    
  },
  props: ['id', 'text', 'priority', 'completed']
}
</script>
