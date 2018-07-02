import axios from 'axios';

function Crud({ priority, text, id, completed}) {
  this.priority = priority;
  this.text = text;
  this.id = id;
  this.completed = completed;
}

export default class TaskService {
  getAll (cruds) {
    this.cruds = cruds;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return axios.get('http://127.0.0.1:8000/api/task')
      .then(({ data }) => {
        var index;
        for (index = 0; index < data.length; ++index) {
          this.cruds.push(new Crud(data[index]));   
        }
        return true;

      })
      .catch(error => {
        return false;
      });
  }

  updateTask (id, text, priority, completed, cruds) {
    this.cruds = cruds;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.put(`http://127.0.0.1:8000/api/task/${id}`, {"text" : text,
    "priority" : priority,"completed" : completed })
      .then(() => {
        this.cruds.find(crud => crud.id === id).text = text;
        this.cruds.find(crud => crud.id === id).priority = priority;
      });
  }

  delTask (id, cruds) {
    this.cruds = cruds;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.delete(`http://127.0.0.1:8000/api/task/${id}`)
      .then(() => {
        let index = this.cruds.findIndex(crud => crud.id === id);
        this.cruds.splice(index, 1);
      });
  }

  addTask (text,priority) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(`http://127.0.0.1:8000/api/task`, {"text": text,
    "priority": priority});
  }
}
export const taskService = new TaskService();