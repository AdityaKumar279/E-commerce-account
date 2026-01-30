import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../store/StoreContext'
import Card from './Card';
import Title from './Title';

function LatestCollection  () {
    const {products} = useContext(StoreContext)
    const [latest, setLatest] = useState([])


    
useEffect( () => {
    setLatest(products.slice(0,10));
    
},[products])


  return (
    <>
    <div className='my-5'>
        <div className='text-center   sm:text-2xl md:text-3xl lg:text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
        </div>
    </div>
    <div  className='grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
            latest.map((product, index) =>(
                <Card 
                    key={index}
                    id={product._id}
                    name={product.name}
                    image={product.images[0]}
                    price={product.price}
                />
            ))
            
      
        }
    </div>
        
    </>
  )
}

export default LatestCollection