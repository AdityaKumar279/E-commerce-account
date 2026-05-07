import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { StoreContext } from '../store/StoreContext'

function List() {
  const {token, setToken, backendUri} = useContext(StoreContext)
  const [list, setList] = useState([])
  

  const FetchList = async () => {
    const response = await axios.get(backendUri+'/api/products/lists', {}, {headers: {token}} )
    setList(response.data.list)
  }

  const RemoveProduct = async (id) => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(backendUri+'/api/products/remove', {id}, {headers:{token}} )
      if(response.data.success){
        toast.success('Product removed successfully')
        await FetchList()
      }else {
        toast.error('Failed to remove product')
      }
    } catch (error) {
      
      toast.error('Failed to remove product')
    }
  }

  useEffect(() => {
    FetchList()
  }, [])
  return (
    <>
    <p className='mb-2'>All Product List</p>
    <div className='flex flex-col gap-2'>
      {/*---------List Table Title ---------*/}
      <div className=' hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/*---------Product List Data ---------*/}
      {list.map((item, index) => (
        <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border text-sm'>
          <img className='w-12' src={item.images[0]} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price.toFixed(2)}</p>
          <p onClick={( )=> RemoveProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default List