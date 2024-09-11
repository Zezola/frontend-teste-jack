import { useState } from "react";

interface ICreateTask {
    name: string,
    description: string
}

function CreateTask () {
    const [formData, setFormData] = useState<ICreateTask>({
        name: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = (e, name, description) => {
        
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, formData.name, formData.description)}>
            <div className='task_name_input'>
                <label>Task Name</label>
                <input name='task_name' onChange={handleChange} value={formData.name}></input>
            </div>
            <div className='task_description_input'>
                <label>Task Description</label>
                <input name='task_description' onChange={handleChange} value={formData.description}></input>
            </div>
            <div className='submit_button'>
                <button type='submit'>Create Task</button>
            </div>
        </form>  
    )
}

export default CreateTask;