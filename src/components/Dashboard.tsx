import { Navigate } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { jwtDecode } from "jwt-decode";


function Dashboard ({signed}) {
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
   
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const decoded = jwtDecode(token);
        setUserId(decoded.sub)
        const api = `http://localhost:3000/task/tasksByUser/${userId}`
        axios.get(api, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        
        .then((res) => setTasks(res.data))
        .catch((err) => console.log(err))
    })

    const handleUpdate = (id) => {
        setIsDisabled(!isDisabled)
    }

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3000/task/${id}`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
        })
    }

    if (signed) {
        return (
            <>
                <div className="tasks_container">
                    {
                        tasks.map((task,index) => {
                            return (
                                <div key={index}>
                                    <form>
                                        <input name="task_name" value={task.name} disabled={isDisabled}/>
                                        <input name="task_description" disabled={isDisabled} value={task.description}></input>
                                        <button disabled>Concluir</button>
                                    </form>
                                    <button onClick={() => handleUpdate(task.id)}>Alterar</button>
                                    <button onClick={() => handleDelete(task.id)}>Deletar</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="create_task_container">
                    <CreateTask userId={userId}/>
                </div>
            </>
            
        )
    } else {
        return <Navigate to="/login" replace></Navigate>
    }
}

export default Dashboard;
