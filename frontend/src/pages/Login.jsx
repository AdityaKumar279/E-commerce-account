import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { StoreContext } from '../store/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from "js-cookie"
function Login() {
    const {token, setToken, navigator,backendUri} = useContext(StoreContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false) 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
            try {
                  const payload = {
                email: formData.email,
                password: formData.password
            }
            const response = await axios.post(`${backendUri}/api/users/login`, payload, {withCredentials:true})
                if(response.data.success){
                    
                    // setToken(Cookies.get('token'))
                    // setToken(response.data.user.token);
                    // localStorage.setItem('token', response.data.user.token)
                    toast.success(response.data.message)
                    setLoading(false)
                    navigator('/')
                }else{
                    // toast.error(response.data.message)
                    console.log(response.data, "eee");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.massage);
            }  finally {
                setLoading(false)
            }     
            }

            useEffect(() => {
                if(token){
                    navigator('/')
                    
                }
            },[token])
        
  return (
    <>
    <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <div className='flex justify-between'>
                     <h1 className='text-2xl font-bold mb-4'>Login </h1>
                     <div onClick={() => navigator('/')} className='cursor-pointer'>
                        <img className='h-5 ' src={assets.cross_icon} alt="" />
                     </div>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className=' mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" name='email' value={formData.email} onChange={handleChange} placeholder='your@gmail.com' required />
                    </div>
                    <div  className=' mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>password</p>
                        <input  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
                        <div className='w-full  flex justify-end'>
                            <span onClick={() => navigator('/forget-password')} className='text-red-500 cursor-pointer'>forget password</span>
                        </div>
                    </div>
                    <button className=' cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>{loading ? "loading" : "Login"}</button>
                    <div className='pt-4 text-center'>
                        <p>Click Hear To : <span onClick={() => navigator('/register')} className='text-blue-600 cursor-pointer'>Create a New Account</span></p>
                    </div>
                </form>
            </div>
        </div>
    
    </>
  )
}

export default Login