import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className=" bg-gray-700 text-gray-100 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <h1 className='text-3xl font-bold'>E-Commerce</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fresh ingredients, fast delivery. Tomato brings delicious meals from local kitchens to your door.
          </p>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="p-2 rounded bg-gray-800 hover:bg-gray-700">
              <img src={assets.facebook_icon} alt="Facebook" className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded bg-gray-800 hover:bg-gray-700">
              <img src={assets.twitter_icon} alt="Twitter" className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="p-2 rounded bg-gray-800 hover:bg-gray-700">
              <img src={assets.linkedin_icon} alt="LinkedIn" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-100 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/orders" className="hover:text-white">Delivery</Link></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact-Us</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Phone: <a href="tel:+15551234567" className="hover:text-white">+1 (555) 123-4567</a></li>
              <li>Email: <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a></li>
              <li>Address: 123 Main St, Anytown, USA</li>
              <li>Hours: Mon - Fri: 9am - 5pm</li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; {year} Tomato. All rights reserved.</p>
          <div className="mt-2 sm:mt-0">
            <a href="/terms" className="hover:text-white mr-4">Terms</a>
            <a href="/security" className="hover:text-white">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer