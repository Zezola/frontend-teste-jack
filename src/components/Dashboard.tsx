import { Navigate, Outlet } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";

// TODO: Make the API request to get ALL tasks passing the auth-token in the HEADERS
const api = "http://localhost:3000/task/"



function Dashboard ({signed}) {
    let [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get(api, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
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
                        tasks.map((task) => {
                            return (
                                <div>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="create_task_container">
                    <CreateTask/>
                </div>
            </>
            
        )
    } else {
        return <Navigate to="/login" replace></Navigate>
    }
}

export default Dashboard;
