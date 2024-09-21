import {createContext, useContext, useState} from 'react';
import {Routes, useNavigate, Route, Link} from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import { AuthContext } from './context/AuthContext';
import UseAuth, { AuthProvider } from './hooks/UseAuth';
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
