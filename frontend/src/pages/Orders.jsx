import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { StoreContext } from '../store/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
function Orders() {
  const {products, currency, backendUri, token} = useContext(StoreContext )
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async (e) => {
    try {

      // axios.defaults.withCredentials = true
      const response = await axios.post(`${backendUri}/api/order/userorders`, {},{headers: {token}})
      if(response.data.success){
        let allOrdersItem = []
        response.data.orderData.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item["date"] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
        
      }
    } catch (error) {
      toast.error("Failed to load order data")
    }
  }



  useEffect(() => {
    if(token) {
      loadOrderData()
    }
  },[token])

  return (
    <div>
      <div className='w-full mt-8'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

       {orderData.map((item, index) => {
          return(
            <div key={index} className="flex justify-between align-middle items-center mt-10 border-t border-b py-2" >
                <div className="flex gap-4">
                    <div>
                        <img className="w-16 sm:w-20" src={item.images[0]} alt="" />
                    </div>
                    <div className="flex flex-col gap-1 pt-2">
                        <h2 className="font-semibold">{item.name}</h2>
                            <p className='text-[14px] text-gray-700'>Size: {item.size}</p>
                            <p  className='text-[14px] text-gray-700'>quantity: {item.quantity}</p>
                            <p  className='text-[14px] text-gray-700'>Price: {currency}{item.price}</p>
                            <p className='text-[14px] text-gray-700'>Payment Method: {item.paymentMethod} </p>
                            <p>Date: <span className='text-[14px] text-blue-700'>{new Date(item.date).toDateString()}</span></p>
                    </div>
                   
                </div>
                <div className='flex items-center gap-2 '>
                    <p className='min-w-2 h-2  rounded-full bg-green-600'></p>
                    <p>{item.status}</p>
                </div>
                 <div className="flex gap-2">
                            <button onClick={loadOrderData}  className=" border border-gray-300  px-2 py-1 rounded-md cursor-pointer">Track Order</button>
                        </div>

            </div>
          )
          
        })}
    </div>
  )
}

export default Orders