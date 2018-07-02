
import axios from 'axios';
function register(username, password, name){
    return axios.post(`http://127.0.0.1:8000/api/user/register`,{"email":username
    ,"password":password,"name":name}).then((data) => {
        localStorage.setItem('token', data['data']['token']);
        return true;
    }).catch(error => {
        if(error.response['status']==422){
            return false;
        }
    });
}
export default { register}