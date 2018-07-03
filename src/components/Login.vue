<template>
	<div id="login" align="center">
		<h1>Login</h1>
		<input type="text" name="username" v-model="input.username" placeholder="Username" />
		<input type="password" name="password" v-model="input.password" placeholder="Password" />
		<button type="button" v-on:click="login()">Login</button>
		<button align="left" type="button" v-on:click="showRegister()">Register</button>
		<p>
			<b style="color:red" id="errors"></b>
		</p>
	</div>
</template>

<script>
import { loginService } from '../js/LoginService.js';

export default {
	data () {
		return {
			input: {},
		}
	},
	methods:{

		login () {
			loginService.login(this.input.username, this.input.password)
				.then((data) => {
					localStorage.setItem('token', data['data']['token']);
					this.$router.replace('/');
				})
				.catch(error => {
					if (error.response['status'] == 401 || error.response['status'] == 422) {
						document.getElementById("errors").innerText = "Wrong username/password!"
					}
				});
		},

		showRegister () {
			this.$router.push('/register');
		}
	}
}
</script>
