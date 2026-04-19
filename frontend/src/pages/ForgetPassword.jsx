import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../store/StoreContext'

const otpCount = 6
function ForgetPassword() {
   const {token, setToken, navigator,backendUri} = useContext(StoreContext)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [inputArr, setInputArr] = useState(new Array(otpCount).fill(""))
    const [otp, setOtp] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    // 222222

    const refArr = useRef([])

    const handleChangeotp = (value, index) => {
      if(isNaN(value)){
        return
      }
      const newValue = value.trim('')
      const newArr = [...inputArr]
      newArr[index] = value.slice(-1)
      newValue && refArr.current[index + 1]?.focus()
      let  otps = newArr.join('')
      setInputArr(newArr)
      setOtp(otps)
    }

    const handleOnKeyDown = (value, index) => {
      if(!value.target.value && value.key == "Backspace"){
        refArr.current[index - 1]?.focus()
      }
    }

    // console.log(formData, otp);
    useEffect(() => {
      refArr.current[0]?.focus()
    }, [])

    const emailHandler = async (e) => {
       e.preventDefault();
       setLoading(true)
      const append = {email: formData.email}
      try {
        const response = await axios.post(`${backendUri}/api/users/forget-password`, append)
        if(response.data.success){
          setLoading(false)
            setStep(2)

        }
        console.log(response.data);
       
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          const email = formData.email
          const response = await axios.post(`${backendUri}/api/users/verify-send-otp`, {email,otp})
          if(response.data.success){
            setLoading(false)
            setStep(3)
          }
          console.log(response);
        } catch (error) {
          console.log(error);
        }finally{
          setLoading(false)

        }
      
    }

    const passHandleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      const append = {
        email: formData.email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      }

      try {
        const response = await axios.post(`${backendUri}/api/users/reset-password`, append);
        if(response.data.success){
          navigator('/login')
          setLoading(false)
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }

  return (
     <>
      <div className='min-h-screen w-full flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
         <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Forget Password </h1>
            <div onClick={() => navigator('/')} className="cursor-pointer">
              x
            </div>
          </div>
          {step === 1 && (
          <form onSubmit={emailHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
            <input
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
          </div>
          <button
              className=" cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
              type="submit"
            >
              {loading ? 'Loading...' : 'ForgetPassword'}
              
            </button>
             <div className='pt-4 text-center'>
                        <p>Click Hear To : <span onClick={() => navigator('/register')} className='text-blue-600 cursor-pointer'>Create a New Account</span></p>
                    </div>

          </form>
          )}
          {step === 2 && (
          <form onSubmit={handleSubmit}>
             <p className='text-sm font-medium text-gray-700 mb-2'>OTP</p>
          <div className='mb-3 min-w-72 flex gap-1'>
           
             {inputArr.map((input, index) => {
                return (
                  <input
                className="rounded-md font-medium text-2xl text-center   w-11 px-3 py-2 border border-gray-300 outline-none"
                key={index}
                type="text"
                name="otp"
                value={inputArr[index]}
                ref={(input) => (refArr.current[index] = input)}
                onChange={(e) => handleChangeotp(e.target.value, index)}
                onKeyDown={(e) => handleOnKeyDown(e , index)}
                required
              />
                )
             })}
          </div>
          <button
              className=" cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
              type="submit"
            >
              {loading ?  'Verifying...' : 'Verify OTP'}
              
            </button>
             <div className='pt-4 text-center'>
                        <p>Click Hear To : <span onClick={() => navigator('/register')} className='text-blue-600 cursor-pointer'>Create a New Account</span></p>
                    </div>

          </form>
          )}

          {step === 3 && (
            <form onSubmit={passHandleSubmit}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>New Password</p>
            <input
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="text"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your newPassword"
                required
              />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>confirmPassword</p>
            <input
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="text"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirmPassword"
                required
              />

          </div>

          <button
              className=" cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
              type="submit"
            >
              {loading ? 'Loading...' : 'Create New Password'}
              
            </button>
             <div className='pt-4 text-center'>
                        <p>Click Hear To : <span onClick={() => navigator('/register')} className='text-blue-600 cursor-pointer'>Create a New Account</span></p>
                    </div>

          </form>
          )}
        </div>
      </div>
    </>
  )
}

export default ForgetPassword