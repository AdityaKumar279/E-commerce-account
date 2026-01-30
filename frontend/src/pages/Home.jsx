import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BeastSeller from '../components/BeastSeller'
import Footer from '../components/Footer'
import OurPolicy from '../components/OurPolicy'

function Home() {
  return (
    <>
    {/* <header>
      <div>
      <div className=' sm:flex gap-4 items-center justify-center my-4 mx-4 grid'>
           <div className='text-center min-w-70 sm:h-10 h-20'>
             <p className='text-[10px] md:text-sm'>---- OUR BESTSELLERS <br />
             <span className='font-bold text-sm md:text-2xl'>Latest Arrivals</span><br />
             SHOP NOW ---</p>
           </div>
           <div className=''>
             <img className='min-sm:wsm' src={assets.header_img} alt="" />
           </div>
         </div>
    </div>
    </header> */}

    <Hero/>
     <LatestCollection/>
     <BeastSeller/>
     <OurPolicy/>

    <main>
    </main>




    
     
    </>
  )
}

export default Home

//  <div className='flex gap-4 items-center justify-center my-4 mx-4'>
//           <div className='text-center min-w-70'>
//             <p className='text-[10px] md:text-sm'>---- OUR BESTSELLERS <br />
//             <span className='font-bold text-sm md:text-2xl'>Latest Arrivals</span><br />
//             SHOP NOW ---</p>
//           </div>
//           <div className=''>
//             <img className='min-sm:wsm' src={assets.header_img} alt="" />
//           </div>
//         </div>
//  <header className='mt-12 relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl mb-6 sm:mb-8 lg:mb-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-0'>
//        <div className=' absolute inset-0 bg-cover bg-center bg-no-repeat'
//        style={{ backgroundImage: `url(${assets.header_img})` }}
//       >
       
//       </div>

//     </header>