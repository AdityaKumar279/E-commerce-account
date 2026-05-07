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
import Home from './pages/Home';






function App() {

  return (
    <>
    <div className='bg-gray-50 min-h-screen '>
     
      
      <Nave/>
    
      <div className='flex w-full'>
         <Sidebar/>
     
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <Routes>
        <Route path='/login' element={<Login/>}  />
        <Route path='/' element={<Home/>}  />
        <Route path='/list' element={<List/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/orders' element={<Orders  />} />
      </Routes>

      </div>
       </div>
      
      
      <Footer/>
      

  
        <ToastContainer/>
      </div>
    </>
  )
}

export default App
