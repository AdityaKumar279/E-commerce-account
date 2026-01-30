import { useEffect, useState } from 'react'
import React, { useContext } from 'react'
import { StoreContext } from '../store/StoreContext'
import Card from './Card'

function RelatedProduct({category, subCategory}) {
    const {products} = useContext(StoreContext)
    const [related, setRelated] = useState([])

    useEffect(() => {

        if(products.length > 0){

        let relatedProduct = products.slice()
        relatedProduct = relatedProduct.filter((item) => category === item.category);
        relatedProduct = relatedProduct.filter((item) => subCategory === item.subCategory);
        setRelated(relatedProduct.slice(0,5));

        }
    },[products])

  return (
    <>

    <div  className='grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
            related.map((product, index) =>(
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

export default RelatedProduct