import { Navigate } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { jwtDecode } from "jwt-decode";


function Dashboard ({signed}) {
    let [tasks, setTasks] = useState([]);
    let [userId, setUserId] = useState<string | null>(null);
   
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

    const handleUpdate = () => {
        console.log("UPDATE")
    }

    const handleDelete = () => {
        console.log("DELETE")
    }

    if (signed) {
        return (
            <>
                <div className="tasks_container">
                    {
                        tasks.map((task,index) => {
                            return (
                                <div key={index}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <button onClick={handleUpdate}>Alterar</button>
                                    <button onClick={handleDelete}>Deletar</button>
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
