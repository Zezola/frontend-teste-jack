import {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import { AuthContext } from './context/AuthContext';
import TaskPage from './components/TaskPage';

function App() {

  const {signed} = useContext(AuthContext)
  
  return (
    <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/dashboard" element={<Dashboard signed={signed}/>} />
          <Route path="/task/:taskId" element={<TaskPage></TaskPage>}></Route>
        </Routes>
      
    </div>
  )
}

export default App
