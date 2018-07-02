import axios from 'axios';

function login(username, password){
    return axios.post(`http://127.0.0.1:8000/api/auth/login`,{"email":username
        ,"password":password}).then((data) => {
            
        localStorage.setItem('token', data['data']['token']);
        
        return true;
        }).catch(error => {
            console.log(error);
            if(error.response['status']==401 || error.response['status']==422){
                return false;
            }
        });
}

function logout(){
    return axios.post(`http://127.0.0.1:8000/api/auth/logout`).then((data)=>{
        localStorage.setItem('token', null);
    });
}
export default { login, logout }