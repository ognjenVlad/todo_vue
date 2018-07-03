import axios from 'axios';

export default class LoginService {
  login (username, password) {
    return axios.post(`http://127.0.0.1:8000/api/auth/login`,{"email" : username,
    "password" : password});
  }

  logout () {
    return axios.post(`http://127.0.0.1:8000/api/auth/logout`)
      .then((data) => {
			  localStorage.setItem('token', null);
      });
  }

  register (username, password, name) {
    return axios.post(`http://127.0.0.1:8000/api/auth/register`,{"email": username,
    "password": password,"name": name });
  }
}

export const loginService = new LoginService();