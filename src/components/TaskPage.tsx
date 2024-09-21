import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

interface TaskPageProps {
    id: number
}

interface iTask {
    name: string,
    description: string,
    completed: boolean
}

interface RegisterFormState {
    name: string,
    description: string
}
 
const TaskPage : FunctionComponent<TaskPageProps> = () => {
    const [task, setTask] = useState<iTask>({name: "", description: "", completed: false})
    //state for managing the form data
    const [formData, setFormData] = useState<RegisterFormState>({
        name: '',
        description: ''
    })

    //function for keeping track of the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }
    const navigate = useNavigate();
    const {taskId} = useParams();

    useEffect(() => {
       const apiCall = axios.get(`http://localhost:3000/task/${taskId}`, {
        headers: {'Authorization' : `Bearer ${localStorage.getItem('access_token')}`}
       })
       .then((res) => setTask(res.data))
       .catch((err) => {console.error(err)})
       
    })

    const handleUpdate = () => {
        console.log(`Name = ${formData.name}`)
        console.log(`Description = ${formData.description}`)
    }

    return ( 
        <div>
            <form>
                <label>Nome</label>
                <input type="text" placeholder={task.name} onChange={handleChange}></input>
                <label>Description</label>
                <input type="text" placeholder={task.description} onChange={handleChange}></input>
            </form>
            <button onClick={() => navigate("/dashboard")}>Voltar as Tarefas</button>
            <button onClick={handleUpdate}>Concluir Alteração</button>
        </div>
     );
}
 
export default TaskPage;