import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        description: '',
    })

    //function for keeping track of the form data
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const navigate = useNavigate();
    const {taskId} = useParams();

    useEffect( () =>  {
       axios.get(`http://localhost:3000/task/${taskId}`, {
        headers: {'Authorization' : `Bearer ${localStorage.getItem('access_token')}`}
       })
       .then((res) => setTask(res.data))
       .catch((err) => {console.error(err)})
       
    })

    const handleUpdate = async () => {
        let name = formData.name;
        let description = formData.description
        if (!(name.length > 0 && description.length > 0)) {
            name = task.name
            description = task.description
        }
        try {
            const payload = await axios.patch(`http://localhost:3000/task/${taskId}`, {
                name: name,
                description: description
            },
            {
                headers: {'Authorization' : `Bearer ${localStorage.getItem('access_token')}`}
            })
            console.log(payload.data)
            navigate("/dashboard")
        } catch (err) {
            console.error(err)
        }
       
    }

    return ( 
        <div>
            <form>
                <label>Nome</label>
                <input type="text" placeholder={task.name} name="name" onChange={handleChange} value={formData.name}></input>
                <label>Description</label>
                <input type="text" placeholder={task.description} name="description" value={formData.description} onChange={handleChange}></input>
            </form>
            <button onClick={() => navigate("/dashboard")}>Voltar as Tarefas</button>
            <button onClick={handleUpdate}>Concluir Alteração</button>
        </div>
     );
}
 
export default TaskPage;