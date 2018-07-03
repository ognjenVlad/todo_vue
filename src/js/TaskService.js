import axios from 'axios';

export default class TaskService {
  getAll () {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return axios.get('http://127.0.0.1:8000/api/task');
  }

  updateTask (id, text, priority, completed) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return axios.put(`http://127.0.0.1:8000/api/task/${id}`, {"text" : text,
    "priority" : priority,"completed" : completed });
  }

  delTask (id) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return axios.delete(`http://127.0.0.1:8000/api/task/${id}`);
  }

  addTask (todo) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(`http://127.0.0.1:8000/api/task`, {"text": todo.text,
    "priority": todo.priority});
  }
}
export const taskService = new TaskService();