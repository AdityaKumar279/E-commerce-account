import { useState } from 'react'
import React from 'react';
import { Suspense } from 'react';
import { ToastContainer} from 'react-toastify';
import { Route, Routes } from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const NaveBar = React.lazy(() => import('./components/NaveBar'))
const About = React.lazy(() => import('./pages/About'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Login = React.lazy(() => import('./pages/Login'))
const Collection = React.lazy(() => import('./pages/Collection'))
const Product = React.lazy(() => import('./pages/Product'))
const PlaceOrder = React.lazy(() => import('./pages/PlaceOrder'))
const Orders = React.lazy(() => import('./pages/Orders'))
const Signin = React.lazy(() => import('./pages/Signin'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Footer = React.lazy(() => import('./components/Footer'))
const ForgetPassword = React.lazy(() => import('./pages/ForgetPassword'))
const EmailVerification = React.lazy(() => import('./pages/EmailVeriyfication')) 
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Login from './pages/Login'
// import Collection from './pages/Collection'
// import Product from './pages/Product'
// import PlaceOrder from './pages/PlaceOrder'
// import Orders from './pages/Orders'
// import Signin from './pages/Signin'
// import Cart from './pages/Cart'
// import Footer from './components/Footer'
// import ForgetPassword from './pages/ForgetPassword';
// import EmailVerification from './pages/EmailVeriyfication';




function App() {


  return (
    <>
    <NaveBar/>
    <div className='px-4 sm:px-[3vw] md:px[7vw] lg:px-[9vw] '>
    
    <Suspense fallback={<div>Loading...</div>}>
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
</Suspense>


    </div>
    <ToastContainer/>
    <Footer/>
    </>
  )
}

export default App

// bg-[#e6edc7]