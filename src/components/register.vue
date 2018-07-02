<template>
    <div id="register" align="center">
      <h1>Register</h1>
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
      <input type="text" name="name" v-model="input.name" placeholder="Full name" />
      <button type="button" v-on:click="register()">Register</button>
      <p v-if="errors">
          <b style="color:red">Email already taken</b>
        </p>
        <p v-if="empty">
          <b style="color:red">Fields cant be empty</b>
        </p>
    </div>

    
</template>
<script>
    import axios from 'axios';
    import service from '../js/RegisterService.js';
    export default {
        data(){
            return {
                input: {},
                errors:false,
                empty:false
            }
        }
        ,methods:{
            register() {
                if(this.input.username==null || this.input.username === ''|| 
                this.input.password==null || this.input.password === '' || 
                this.input.name==null || this.input.name === ''){
                    this.empty = true;
                    this.errors = false;
                    return;
                }
                this.empty = false;
                service.register(this.input.username, this.input.password, this.input.name
                ).then((data)=>{
                    if(data){
                        this.$router.replace('/');
                    }else{
                        this.errors=true;
                    }
                })
                
                
            }
        }
    }
</script>