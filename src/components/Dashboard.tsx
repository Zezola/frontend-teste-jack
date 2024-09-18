import { Navigate, Outlet } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { jwtDecode } from "jwt-decode";

// TODO: Make the API request to get ALL tasks passing the auth-token in the HEADERS


interface jwtPayload {
    userId: string
}


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
