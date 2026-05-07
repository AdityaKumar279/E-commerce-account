import axios from 'axios'
import React from 'react'
import { StoreContext } from '../store/StoreContext'
import { useContext } from 'react'

function EmailVerification() {
    const {token, setToken, navigator,backendUri} = useContext(StoreContext)
    const verifyEmail = async (e) => {
        e.preventDefault()
        try {
            // axios.defaults.withCredentials = true
            const response = await axios.post(`${backendUri}/api/users/send-otp`, {}, {headers: {token}})
            if(response.data.success){
                toast.success("OTP sent successfully")
            }
        } catch (error) {
            toast.error("Failed to send OTP")
        }
    }

  return (
    <>
    <div>
        <button onClick={verifyEmail}>verify</button>
    </div>
    </>
  )
}

export default EmailVerification