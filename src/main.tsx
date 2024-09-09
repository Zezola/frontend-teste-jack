import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <BrowserRouter>
        <AuthProvider>
          <App/>
        </AuthProvider>
        
      </BrowserRouter> 
       
  </StrictMode>,
)
