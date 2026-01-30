import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/frontend_assets/assets.js'

function Sidebar() {
  return (
    <div className='sm:w-[20%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-[20%] text-[15px]'>
            <NavLink  to= "/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 rounded-1">
                <img className='w-5 sm:h-10' src={assets.add_icon_green} alt="" />
                <p className='hidden md:block'>Add Item</p>
            </NavLink>
            <NavLink  to= "/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 rounded-1">
                <img className='w-5 sm:h-10' src={assets.bag_icon} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink  to= "/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 rounded-1">
                <img className='w-5 sm:h-10' src={assets.parcel_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar