import React, { useState } from 'react'

function Nave({setToken}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user] = useState({ name: 'Admin User', email: 'admin@example.com' })

  return (
    <nav className='h-15 flex justify-between bg-gray-700 text-amber-50 px-3 items-center'>
        <div>
            <h2 className='text-lime-200 text-2xl'>Admin Penal</h2>
        </div>
        <div></div>
        <div>
            <button onClick={() => setToken("")} className='h-7 w-18 bg-amber-600 rounded-2xl' >
              logout
            
            </button>
        </div>
    </nav>
  )
}


export default Nave


{/* <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">{process.env.REACT_APP_ADMIN_TITLE || 'Admin Panel'}</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</a>
            <a href="/products" className="hover:text-gray-300 transition-colors">Products</a>
            <a href="/orders" className="hover:text-gray-300 transition-colors">Orders</a>
            <a href="/users" className="hover:text-gray-300 transition-colors">Users</a>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden lg:block">{user.name}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/dashboard" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Dashboard</a>
              <a href="/products" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Products</a>
              <a href="/orders" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Orders</a>
              <a href="/users" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Users</a>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <a href="/profile" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Profile</a>
                <a href="/settings" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Settings</a>
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md">Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav> */}