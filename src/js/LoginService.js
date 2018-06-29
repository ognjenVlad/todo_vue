import axios from 'axios';

function login(username, password){
    return axios.post(`http://127.0.0.1:8000/api/auth/login`,{"email":username
        ,"password":password});
}

function logout(){
    return axios.post(`http://127.0.0.1:8000/api/auth/logout`);
}
export default { login, logout }