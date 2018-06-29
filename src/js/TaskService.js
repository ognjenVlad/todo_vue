import axios from 'axios';
function Crud({ priority, text, id, completed}) {
    this.priority = priority;
    this.text = text;
    this.id = id;
    this.completed = completed;
}
function getAll(cruds){
    this.cruds = cruds;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.get('http://127.0.0.1:8000/api/task').then(({ data }) => {
        var index;
        
        for (index = 0; index < data['tasks'].length; ++index) {
            
            this.cruds.push(new Crud(data['tasks'][index]));
        
        }
        console.log(this.cruds);
    
    }).catch(error => {
        console.log(error);
        if(error.response['status']==401 || error.response['status']==422){
            this.$router.replace('/login');
    }
    });
}

function updateTask(id, text, priority, completed, cruds){
    this.cruds = cruds;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.put(`http://127.0.0.1:8000/api/task/${id}`, {"text":text, "priority":priority,"completed":completed }).then(() => {

      this.cruds.find(crud => crud.id === id).text = text;
      this.cruds.find(crud => crud.id === id).priority = priority;
    });
}

function delTask(id, cruds){
    this.cruds = cruds;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.delete(`http://127.0.0.1:8000/api/task/${id}`).then(() => {
        let index = this.cruds.findIndex(crud => crud.id === id);
        this.cruds.splice(index, 1);
    });
}

function addTask(text,priority){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            
    return axios.post(`http://127.0.0.1:8000/api/task`, {"text":text,
    "priority":priority})
    
}
export default { delTask, getAll, updateTask, addTask }