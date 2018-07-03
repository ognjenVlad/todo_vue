<template>
  <div id="register" align="center">
    <h1>Register</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <input type="text" name="name" v-model="input.name" placeholder="Full name" />
    <button type="button" v-on:click="register()">Register</button>
    <p>
			<b style="color:red" id="errors"></b>
    </p>
  </div>

    
</template>
<script>
import axios from 'axios';
import { loginService } from '../js/LoginService.js';

export default {
  data () {
    return {
      input: {},
    }
  },
  
  methods: {

    register () {
      if( !this.input.username || !this.input.password || !this.input.name ){
				document.getElementById("errors").innerText = "Fileds cant be empty!";
				return;
      }
      loginService.register(this.input.username, this.input.password, this.input.name)
        .then((data) => {
          localStorage.setItem('token', data['data']['token']);
          this.$router.replace('/');
        })
        .catch(error => {
          if (error.response['status'] == 422) { 
              document.getElementById("errors").innerText = "Email already taken!";
          }
        });
    }
  }
}
</script>