import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { StoreContext } from '../store/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {
  const { products, currency, setCartItems, cartItems, navigator,  UpdateQuantity, getCartAmount,backendUri,delivery_fee,token } = useContext(StoreContext);
  const [method, setMethod] = useState('cod')
  const [formDAta, setFormDAta] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormDAta(data => ({...data, [name]:value}))

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    
      const orderItem = [];

      for (const itemid in cartItems) {
      for (const size in cartItems[itemid]) {
        if (cartItems[itemid][size] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === itemid))
          if(itemInfo) {
            itemInfo.size = size
            itemInfo.quantity = cartItems[itemid][size]
            orderItem.push(itemInfo)
          }
        }
      }
    }
    let orderData = {
      address: formDAta,
      items: orderItem,
      amount: getCartAmount() + delivery_fee,
    }

    // API call for cod
   try {
     switch(method) {
      case 'cod':
        
        const response = await axios.post(`${backendUri}/api/order/place`, orderData, {headers:{token}})
        if(response.data.success) {
          toast.success(response.data.message)
          setCartItems({})
          navigator('/orders')
        }else{
          toast.error(response.data.message)
        }
    }
   } catch (error) {
    toast.error("please create account or login ")
    navigator("/login")
   }

    
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row  gap-10 justify-between '>
      <div>
        <div className='mt-8'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-2 mt-2'> 
          <input onChange={onChangeHandler} name='firstName' value={formDAta.firstName}  type="text" placeholder='First name' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required/>
           <input onChange={onChangeHandler} name='lastName' value={formDAta.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required/>
        </div>
        <div className='mt-2'>
           <input onChange={onChangeHandler} name='email' value={formDAta.email} type="text" placeholder='Email address' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required/>
            <input onChange={onChangeHandler} name='street' value={formDAta.street} type="text" placeholder='Street' className='border mt-2 border-gray-300 rounded py-0.5 px-3.5 w-full' required/>
        </div>
         <div className='flex gap-2 mt-2'> 
          <input onChange={onChangeHandler} name='city' value={formDAta.city} type="text" placeholder='city' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required/>
           <input onChange={onChangeHandler} name='state' value={formDAta.state} type="text" placeholder='state' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required />
        </div>
         <div className='flex gap-2 mt-2 '> 
          <input onChange={onChangeHandler} name='zip' value={formDAta.zip} type="text" placeholder='zip-code' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required />
           <input onChange={onChangeHandler} name='country' value={formDAta.country} type="text" placeholder='country' className='border border-gray-300 rounded py-0.5 px-3.5 w-full' required />
        </div>
         <input onChange={onChangeHandler} name='phone' value={formDAta.phone} type="text" placeholder='Phone' className='border mt-2 border-gray-300 rounded py-0.5 px-3.5 w-full' required />

      </div>
      <div className='mt-10'>
        <CartTotal/>

         <div className='mt-2'>
        <Title text1={'PAYMENT'} text2={'METHOD'}/>
      </div>

      <div className='grid  grid-cols-2 sm:grid-cols-3 gap-2 mt-2'>
        <div onClick={() => setMethod('strip')} className= 'flex items-center border border-gray-300 w-full py-0.5 px-3.5 gap-1 cursor-pointer '>
          <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'strip' ? 'bg-green-500' : '' }`}></p>
          <button  className='text-blue-700 cursor-pointer '>strip</button>
        </div>
        <div onClick={() => setMethod('Razorpay')} className= 'flex items-center border border-gray-300 w-full py-0.5 px-3.5 gap-1 cursor-pointer '>
          <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'Razorpay' ? 'bg-green-500' : '' }`}></p>
          <button  className='text-blue-700 cursor-pointer '>Razorpay</button>
        </div>
        <div onClick={() => setMethod('cod')} className= 'flex items-center border border-gray-300 w-full py-2 px-3.5 gap-1 cursor-pointer text-[10px] '>
          <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'cod' ? 'bg-green-400' : '' }`}></p>
          <button  className='text-blue-700 cursor-pointer '>CASH ON DELIVERY</button>
        </div>
      </div>
      <div className='w-full text-end mt-2'>
        <button type='submit' className='bg-black text-white py-2 px-3.5 rounded text-sm mt-2 cursor-pointer'>PLACE ORDER</button>
      </div>
      </div>
     
    </form>
  )
}

export default PlaceOrder