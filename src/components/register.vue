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
    </div>

    
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                input: {}
                ,errors:false
            }
        }
        ,methods:{
            register() {
                axios.post(`http://127.0.0.1:8000/api/user/register`,{"email":this.input.username
                ,"password":this.input.password,"name":this.input.name}).then((data) => {
                    console.log(data);
                    
                    localStorage.setItem('token', data['data']['token']);
                    this.$router.replace('/');
                }).catch(error => {
                    console.log(error.response['status']);
                    if(error.response['status']==422){
                        console.log(422);
                        this.errors=true;
                    }
                });
                
            }
        }
    }
</script>