import React, { useContext } from 'react'
import { StoreContext } from '../store/StoreContext'
import { Link } from 'react-router-dom'

function Card({id, name, image, price, }) {
  const {currency} = useContext(StoreContext)
 


  return (
    
        <Link to={`/product/${id}`} key={id}  className='text-gray-700 cursor-pointer border flex flex-col justify-between p-3  bg-white  border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-200' >
        <div className='overflow-hidden'>
          <img className='hover:scale-110 transition-ease-in-out' src={image} alt="" />
        </div>
        <div>
           <p className='pt-3 pb-1 text-sm '>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
        </div>
       
        </Link>
  )
}

export default Card


{/*  */}
    