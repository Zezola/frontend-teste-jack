import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react'
import * as Yup from 'yup';

const RegisterForm : React.FunctionComponent = () => {
  //Set up a success message
  const [successMsg, setSuccessMsg] = useState('')
  //Using yup for field validation
  const registerFormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .min(8, 'At least 8 chars')
      .max(25, 'Max of 25 chars')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 chars long')
      .max(15, 'Password can be at maximum 15 chars long')
      .required('Password is required')
  })

  return (
    <div>
      <h1>Register</h1>
      <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={registerFormSchema}
      onSubmit={(values,action) => {
        axios.post(`http://localhost:3000/user`, {
          email: values.email,
          password: values.password
        })
        .then((res) => {
          if (res.status === 201) {
            setSuccessMsg('Usuario cadastrado com sucesso')
            setTimeout(() => {
              setSuccessMsg('')
            },2000)
          }
        })
        .catch(error => console.error(error))
        action.setSubmitting(false)
      }}
      >
        {({errors, touched}) => (
            <Form>
            <div>
              <label htmlFor='email'>Email: </label>
              <Field id="email" name="email" placeholder="email"></Field>
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>
            <div className='password_input'>
              <label htmlFor='password'>Password: </label>
              <Field id="password" name="password" placeholder="password"></Field>
              {touched.password && errors.password && <div>{errors.password}</div>}
            </div>
            <div className='submit_button'>
              <button type='submit'>Register</button>
            </div>
            <div>
              {successMsg}
            </div>  
          </Form>
        )}
        
      </Formik>
    </div>
  )
}

export default RegisterForm