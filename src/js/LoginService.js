import axios from 'axios';

export default class LoginService {
  login (username, password) {
    return axios.post(`http://127.0.0.1:8000/api/auth/login`,{"email" : username,
    "password" : password})
      .then((data) => {
        localStorage.setItem('token', data['data']['token']);
        return true;
      })
      .catch(error => {
        if (error.response['status'] == 401 || error.response['status'] == 422) {
          return false;
        }
      });
  }

  logout () {
    return axios.post(`http://127.0.0.1:8000/api/auth/logout`)
      .then((data) => {
			  localStorage.setItem('token', null);
      });
  }

  register (username, password, name) {
    return axios.post(`http://127.0.0.1:8000/api/auth/register`,{"email": username,
    "password": password,"name": name })
      .then((data) => {
        localStorage.setItem('token', data['data']['token']);
        return true;
      })
      .catch(error => {
        if (error.response['status'] == 422) { 
            return false;
        }
      });
  }
}

export const loginService = new LoginService();