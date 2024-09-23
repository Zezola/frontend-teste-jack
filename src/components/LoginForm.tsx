import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginAPI } from "../services/AuthService";
import { useNavigate } from "react-router-dom";


const LoginForm : React.FunctionComponent = () => {
//interface for referencing in the form data
  interface LoginFormState {
    email: string,
    password: string
  }

  //state for managing the form data
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: ''
  })

  //function for keeping track of the form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }
  
  //get the signed and setSigned state variables from our AuthContext
  const {signed, setSigned} = useContext(AuthContext);
  const navigate = useNavigate(); 

  // take the formData.email and formData.password and pass it to the login function from the context
  const handleSubmit = async (e, email: string, password: string) => {
    email = formData.email;
    password = formData.password;
    e.preventDefault();
    
    //Call the loginAPI from the AuthService.
    const data = await loginAPI(email, password) // the data receives the access_token
    localStorage.setItem("access_token", data.access_token);
    if (!(localStorage.getItem("access_token") === null)) {
      setSigned(true)
      navigate("/dashboard")
    }
  }

  return (
      <form onSubmit={(e) => handleSubmit(e, formData.email, formData.password)}>
      <div className='email_input'>
        <label>Email</label>
        <input name='email' onChange={handleChange} value={formData.email}></input>
      </div>
      <div className='password_input'>
        <label>Password</label>
        <input name='password' onChange={handleChange} value={formData.password}></input>
      </div>
      <div className='submit_button'>
        <button type='submit'>Login</button>
      </div>
    </form>  
  )
}

export default LoginForm