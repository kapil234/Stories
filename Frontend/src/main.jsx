import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
=======
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import AuthProvider from './context/AuthContext.jsx'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
    <AuthProvider>
 <RouterProvider router={router}/>
   <ToastContainer
      position="top-right"
      autoClose={2000}
      theme="colored"
    />
 </AuthProvider>
   

>>>>>>> df47d56 (Initial project setup (frontend + backend))
)
