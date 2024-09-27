import { Navigate } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { jwtDecode } from "jwt-decode";
import Task from "./Task";

interface DashboardProps {
    signed: boolean
}


const Dashboard : React.FunctionComponent<DashboardProps> = ({signed}) => {
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

    const handleUpdate = (id : number) => {
        setIsDisabled(!isDisabled)
    }

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3000/task/${id}`, {
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
                                <Task 
                                key={index}
                                id={task.id}
                                name={task.name} 
                                description={task.description} 
                                isCompleted={task.isCompleted}
                                onDelete={() => handleDelete(task.id)}
                                onUpdate={() => handleUpdate(task.id)}
                                />
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
