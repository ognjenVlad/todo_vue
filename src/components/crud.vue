<template>
 
    <li class="list-group-item">
      Task {{name}}:  {{ text }}

      <button @click="del">Delete</button>
    </li>
  
</template>
<script>
export default {
  methods: {
    update (val) {
      this.$emit('update', this.name)
    },
    del () {
      this.$emit('delete', this.name)
    }
  },
  props: ['name', 'text', 'priority']
}
</script>
