import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../../../admin/src/assets/frontend_assets/assets'
import { StoreContext } from '../store/StoreContext'

function NaveBar() {
  const navigation = useNavigate()
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const {getCartCount, navigator, token, setToken, setCartItems} = useContext(StoreContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigator('login')
  }
  return (
    <>
    <nav className='flex justify-between bg-gray-400 text-white px-3 items-center'>
      <div onClick={() => navigation('/')}>
        <h2 className='md:text-2xl font-bold cursor-pointer text-gray-950'>E-Commerce</h2>
      </div>
      <div className=' hidden md:flex md:space-x-4  text-gray-700 '>
        <NavLink to="/">
        <p  className='hover:text-gray-950 text-[14px]'>HOME</p>
        </NavLink>

        <NavLink to="/Collection" >
          <p className='hover:text-gray-950 text-[14px]'>COLLECTION</p>
        </NavLink>
        <NavLink to= "about" >
           <p className='hover:text-gray-950 text-[14px]'>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" >
          <p className='hover:text-gray-950 text-[14px]'>CONTACT</p>
        </NavLink>
        <NavLink to="/orders" >
          <p className='hover:text-gray-950 text-[14px]'>ORDERS</p>
        </NavLink>
        




      </div>

       
        




<div className='flex gap-8 items-center' >
  <div className="relative ">
      <div className='flex items-center cursor-pointer gap-3 md:gap-15 lg:-gap-6 sm:gap-4'>
        
      <div onClick={() => setShowSearch(e => !e)} className='cursor-pointer'>
        <img src={assets.search_icon} alt="" />

      </div>

      <Link to="/cart" aria-label="Cart" className="relative p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
              <img src={assets.bag_icon} alt="Cart" className="h-6 w-6" />
              {/* static badge placeholder */}
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">{getCartCount()}</span>
            </Link>

          {showSearch && (
                <div className="absolute right-1 md:right-50 lg:right-140 mt-30 w-64 lg:max-w-100 bg-gray-900 p-2 rounded shadow-lg md:block">
                  <label htmlFor="nav-search" className="sr-only">Search menu</label>
                  <input id="nav-search" type="search" placeholder="Search menu..." className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              )}

        {token ?
        <div onClick={ logout} className='h-8 w-20 hidden md:block lg:block  text-center rounded-sm my-3 bg-gray-900 cursor-pointer'>Logout</div> :
        <div onClick={() => navigation('/login')} className='h-8 w-20 hidden md:block lg:block  text-center rounded-sm my-3 bg-gray-900 cursor-pointer'>Login</div>
        }
      </div>
      </div>

      
      <div onClick={() => setOpen(e => !e)} className='sm:hidden text-2xl font-bold flex items-center gap-6'>
       <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="46" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>

{open && (
  <div className='group-hover:to-black  absolute dropdown-menu right-8 top-10 '>
  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600'>
     <NavLink to="/">
        <p  className='hover:text-gray-950 text-sm'>Home</p>
        </NavLink>

        <NavLink to="/Collection" >
          <p className='hover:text-gray-950 text-sm'>Collection</p>
        </NavLink>
        <NavLink to= "about" >
           <p className='hover:text-gray-950 text-sm'>About</p>
        </NavLink>
        <NavLink to="/contact" >
          <p className='hover:text-gray-950 text-sm'>Contact</p>
        </NavLink>
        <NavLink to="/orders" >
          <p className='hover:text-gray-950 text-sm'>Orders</p>
        </NavLink>
        
          {token ? <p onClick={logout} className='hover:text-gray-950 text-sm cursor-pointer'>LogOut</p>
          : <p onClick={() => navigator('login')} className='hover:text-gray-950 text-sm cursor-pointer'>Login</p>}
        
  </div>
</div>
)}


      </div>

      </div>


    </nav>
    </>
  )
}

export default NaveBar

// fill-rule="evenodd"