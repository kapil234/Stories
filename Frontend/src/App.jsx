import Header from './components/Header'
import {  Outlet } from 'react-router-dom'

function App() {
 

  return (
    <>
    
      <Header/>
      <main className="mt-14  bg-gray-100 min-h-screen ">
      <Outlet/>
      </main>
  
    </>
  )
}

export default App