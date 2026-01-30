import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Hero() {
  return (
    <>
        <div className='flex flex-col sm:flex-row w-full border border-gray-400 my-15'>
            
 <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
             <p className='text-[10px] md:text-sm'>---- OUR BESTSELLERS <br />
             <span className='font-bold text-sm md:text-2xl'>Latest Arrivals</span><br />
             SHOP NOW ---</p>
           </div>
            {/* hero right side */}
            
                <img className='w-full sm:w-1/2' src={assets.hero_section} alt="" />
            
        </div>
    </>
  )
}

export default Hero



//    <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//             <div className='text-[#414141]'>
//                  <p className='w-8 md:m-11 h-[2px] bg-[#414141]'></p>
//             <p className='font-medium text-sum md:text-base'>Our bestseller</p>
//             </div>
//             <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
//             <div className='flex items-center gap-2'>
//             <p className='font-medium text-sum md:text-base'>Shop Now</p>
//             <p className='w-8 md:m-11 h-[2px] bg-[#414141]'></p>
//             </div>
           

//             </div>