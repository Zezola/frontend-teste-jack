import axios from 'axios';
import { useState } from 'react'

const RegisterForm : React.FunctionComponent = () => {
      //interface for referencing in the form data
  interface RegisterFormState {
    email: string,
    password: string
  }

  //state for managing the form data
  const [formData, setFormData] = useState<RegisterFormState>({
    email: '',
    password: ''
  })

  //function for keeping track of the form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post('http://localhost:3000/user', {
      email: formData.email,
      password: formData.password
    })
    .then(function (response) {
      console.log(response)
      setFormData({
        email: '',
        password: ''
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='email_input'>
        <label>Email</label>
        <input name='email' onChange={handleChange} value={formData.email}></input>
      </div>
      <div className='password_input'>
        <label>Password</label>
        <input name='password' onChange={handleChange} value={formData.password}></input>
      </div>
      <div className='submit_button'>
        <button type='submit'>Register</button>
      </div>
    </form>
  )
}

export default RegisterForm