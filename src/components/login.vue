<template>
    <div id="login" align="center">
            <h1>Login</h1>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
            <button align="left" type="button" v-on:click="show_register()">Register</button>
            <p v-if="errors">
                <b style="color:red">Wrong username/password</b>
            </p>
    </div>
</template>

<script>
    import service from '../js/LoginService.js';
    export default {
        data() {
            return {
                input: {},
                errors:false
            }
        },
        methods:{
            login() {
                service.login(this.input.username, this.input.password)
                .then((data) => {
                    if(data.status===401){
                        return;
                    }
                localStorage.setItem('token', data['data']['token']);
                this.$router.replace('/');
                }).catch(error => {
                    if(error.response['status']==401 || error.response['status']==422){
                        this.errors - true;
                    }
                });
            },
            show_register() {
            
                this.$router.push('/register');
                
            }
        }
        
    }
</script>
