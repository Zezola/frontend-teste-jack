import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import RegisterForm from './components/RegisterForm.tsx'
import LoginForm from './components/LoginForm.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello World!</h1>
  },
  {
    path: "/register",
    element: <RegisterForm/>
  },
  {
    path: "/login",
    element: <LoginForm/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
