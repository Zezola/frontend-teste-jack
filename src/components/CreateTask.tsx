import axios from "axios";
import { useState } from "react";

interface CreateTaskProps {
    userId: number
}

const CreateTask : React.FunctionComponent<CreateTaskProps> = (userId) => {
    const token = localStorage.getItem("access_token");
    interface ICreateTask {
        name: string,
        description: string
    }
    
    const [formData, setFormData] = useState<ICreateTask>({
        name: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = (e, name, description) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/task`, {
            name: name,
            description: description,
            userId: userId.userId,
            completed: false
        },
        {headers: {
            "Authorization": `Bearer ${token}`
        }}
        )
        .then((res) => {
            setFormData({
                name: '',
                description: ''
            })
        })
        .catch(err => console.error(err))
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, formData.name, formData.description)}>
            <div className='task_name_input'>
                <label>Task Name</label>
                <input name='name' onChange={handleChange} value={formData.name}></input>
            </div>
            <div className='task_description_input'>
                <label>Task Description</label>
                <input name='description' onChange={handleChange} value={formData.description}></input>
            </div>
            <div className='submit_button'>
                <button type='submit'>Create Task</button>
            </div>
        </form>  
    )
}

export default CreateTask;