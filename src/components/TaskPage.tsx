import axios from "axios";
import { Field, Form, Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

interface TaskPageProps {
    id: number
}

interface iTask {
    name: string,
    description: string,
    completed: boolean
}
 
const TaskPage : FunctionComponent<TaskPageProps> = () => {
    const updateTaskSchemaValidation = Yup.object().shape({
        name: Yup.string().min(5, 'Nome precisa ter ao menos 5 caracteres').required('Nome nao pode estar em branco'),
        description: Yup.string().required('Descricao nao pode estar em branco')
    })

    const [task, setTask] = useState<iTask>({name: "", description: "", completed: false})
    const navigate = useNavigate();
    const {taskId} = useParams();

    useEffect( () =>  {
       axios.get(`http://localhost:3000/task/${taskId}`, {
        headers: {'Authorization' : `Bearer ${localStorage.getItem('access_token')}`}
       })
       .then((res) => setTask(res.data))
       .catch((err) => {console.error(err)})
       
    })

    const handleSubmit = async (name: string, description: string) => {
        try {
            const response = await axios.patch(`http://localhost:3000/task/${taskId}`, {
                name: name,
                description: description
            }, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
            })
            console.log(response.data)
            navigate("/dashboard")
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <div>
            <Formik
            validationSchema={updateTaskSchemaValidation}
            initialValues={{name: '', description: ''}}
            onSubmit={(values) => handleSubmit(values.name, values.description)}
            >
                {({errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Nome: </label>
                            <Field id="name" name="name" placeholder={task.name}></Field>
                            {touched.name && errors.name && <div>{errors.name}</div>}
                        </div>
                        <div>
                            <label htmlFor="description">Description: </label>
                            <Field id="description" name="description" placeholder={task.description}></Field>
                            {touched.name && errors.name && <div>{errors.name}</div>}
                        </div>
                        <button onClick={() => navigate("/dashboard")}>Voltar</button>
                        <button type="submit">Concluir Alteracao</button>
                    </Form>
                )}
            </Formik>
        </div>
     );
}
 
export default TaskPage;