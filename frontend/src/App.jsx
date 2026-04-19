import { useState } from 'react'
import { ToastContainer} from 'react-toastify';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NaveBar from './components/NaveBar'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Collection from './pages/Collection'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Signin from './pages/Signin'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import ForgetPassword from './pages/ForgetPassword';
import EmailVerification from './pages/EmailVeriyfication';


function App() {


  return (
    <>
    <NaveBar/>
    <div className='px-4 sm:px-[3vw] md:px[7vw] lg:px-[9vw] '>
    <ToastContainer/>
    <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/Collection' element={<Collection/>}  />
        <Route path='/about' element={<About/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/product/:ProductId' element={<Product/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/register' element={<Signin/>}  />
        <Route path='/placeOrder' element={<PlaceOrder/>}  />
        <Route path='orders' element={<Orders/>}  />
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/emailverification' element={<EmailVerification/>}/>
        <Route path='*' element={<h1>404</h1>}  />
      </Routes>

    

    </div>
    <Footer/>
    </>
  )
}

export default App

// bg-[#e6edc7]