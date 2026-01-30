import { Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import Nave from './components/Nave';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import Login from './components/Login';


export const backendUri = import.meta.env.VITE_APP_API_URL



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")
  useEffect(() => {
   
    localStorage.setItem('token', token)
    
  }, [token])

  return (
    <>
    <div className='bg-gray-50 min-h-screen '>
       {token === "" 
    ? <Login setToken= {setToken}/>
    :  <>
       <Nave setToken={setToken}/>
       <hr />
      
      <ToastContainer/>
      <div className='flex w-full'>
        <Sidebar/>
     
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <Routes>
        <Route path='/add' element={<Add token={token}/>}  />
        <Route path='/list' element={<List token={token}/>} />
        <Route path='/orders' element={<Orders token={token} />} />
      </Routes>

      </div>
       </div>
      
      
      <Footer/>
      </>

  }
     
      </div>
    </>
  )
}

export default App
