import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginAPI } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import axios from "axios";

const LoginForm : React.FunctionComponent = () => {
  const loginValidationSchema = Yup.object().shape({
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
  //get the signed and setSigned state variables from our AuthContext
  const {signed, setSigned} = useContext(AuthContext);
  const navigate = useNavigate(); 

  // take the formData.email and formData.password and pass it to the login function from the context
  const handleSubmit = async (email: string, password:string) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        email: email,
        password: password
      })
      localStorage.setItem("access_token", response.data.access_token);
      if (!(localStorage.getItem("access_token") === null)) {
        setSigned(true)
        navigate("/dashboard")
      }
    } catch (error) {
      console.error(error)
    }
    
  }

  return (
      <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => handleSubmit(values.email, values.password)}
      >
        {({errors, touched}) => 
           <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" id="email" placeholder="Enter your email"></Field>
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" id="password" placeholder="Enter your password"></Field>
              {touched.password && errors.password && <div>{errors.password}</div>}
            </div>
            <div>
              <button type='submit'>Login</button>
            </div>
          </Form>
        }
       
      </Formik>  
  )
}

export default LoginForm