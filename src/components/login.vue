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
                this.input.errors = false;
                service.login(this.input.username, this.input.password)
                .then((data) => {
                    if(!data){
                        this.errors = true;
                    }else{
                        this.$router.replace('/');
                    }
                });
            },
            show_register() {
            
                this.$router.push('/register');
                
            }
        }
        
    }
</script>
