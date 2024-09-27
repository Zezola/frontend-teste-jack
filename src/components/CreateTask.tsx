import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

const createTaskValidationSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Nome precisa ter ao menos 5 caracteres').required('Nome nao pode estar em branco'),
    description: Yup.string().required('Descricao nao pode estar em branco')
})

interface CreateTaskProps {
    userId: number
}

const CreateTask : React.FunctionComponent<CreateTaskProps> = (userId) => {
    const token = localStorage.getItem("access_token");

    const handleSubmit = async (name:string, description:string) => {       
        try {
            const response = await axios.post(`http://localhost:3000/task`, {
                name: name,
                description: description,
                userId: userId.userId,
                completed: false
            },
            {headers: {
                "Authorization": `Bearer ${token}`
            }}
            )
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }        
    }

    return (
        <Formik
        initialValues={{name: '', description: ''}}
        validationSchema={createTaskValidationSchema}
        onSubmit={(values) => handleSubmit(values.name, values.description)}
        >
            {({errors, touched}) => (
                <Form>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <Field id="name" name="name" placeholder="name"></Field>
                    {touched.name && errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor='description'>Description: </label>
                    <Field id="description" name="description" placeholder="description"></Field>
                    {touched.description && errors.description && <div>{errors.description}</div>}
                </div>
                <div>
                    <button type="submit">Concluir</button>
                </div>
            </Form>
            )

            }

        </Formik> 
    )
}

export default CreateTask;