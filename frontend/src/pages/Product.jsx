import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../store/StoreContext'
import Title from '../components/Title';
import RelatedProduct from '../components/RelatedProduct';

function Product() {
  const {products, currency, addToCart} = useContext(StoreContext)
  const {ProductId} = useParams();

  const [product, setProduct] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')


  const selectProduct = async () => {
      products.map((item) => {
      if(item._id === ProductId){
        setProduct(item)
        setImage(item.images[0])
        return null;

      }
    })
   
  }

  useEffect(() => {
    selectProduct()
  }, [ProductId, products])
  return product ? (
    <>
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product data */}
          <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
            {/* product images */}
            <div className='flex flex-col-reverse gap-3 sm:flex-row'>
              <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full'>
                  {
                    product.images.map((img, index) => (
                      <img onMouseMove={() => setImage(img)} className='w-[24%] sm:w-full sm:mb-3 shrink-0 object-cover cursor-pointer' src={img} alt="" key={index}/>
                    ))
                  }
              </div>
              <div className='w-full sm:[50%]'>
                <img className='w-100 h-auto' src={image} alt="" />
              </div>

            </div>
            {/* product details */}
            <div className='flex flex-col gap-3 w-full sm:pr-20'>
              <h1 className='text-3xl font-bold mt-'>{product.name}</h1>
              <p className='text-3xl font-medium '>{currency}{product.price}</p>
              <p className=' mt- text-gray-500 md:w-4/5'>{product.description}</p>
              <div className='flex flex-col gap-4 my-4'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {product.sizes.map((item, index) => (
                    <button key={index} onClick={() => setSize(item)} className={`border border-black px-4 py-2 rounded-lg mr-2 cursor-pointer hover:border-gray-400 ${item === size ? 'bg-gray-500' : ''}`}>{item}</button>
                  ))}
                </div>

              </div>
              <button onClick={() => addToCart(product._id, size)} className='bg-black text-white w-35 px-4 py-2 rounded-lg cursor-pointer'>Add to cart</button>
              <hr className='mt-4 sm:w-4/5 md:w-4/4' />
              <div className='text-sm'>
                <p>100% Original Product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy 7 days return and exchange available.</p>
              </div>
            </div>
          </div>

          <div className='flex mt-6'>
            <div className='px-6 py-3 bg-gray-300 border font-bold border-gray-400'>Description</div>
            <div className='px-6 py-3 bg-gray-300 border text-gray-700 border-gray-400 font-bold'>Reviews(122)</div>
           
          </div>
            <hr className='text-gray-400' />
            <p className='text-sm text-gray-700 my-5'>Women's Solid Zipper Hooded Sweatshirt | Front Zip, Ribbed Hem, Lined Hood, Casual Winter Wear | Winter Wear for Women's</p>
            <p className='text-sm text-gray-700 my-5'>Women's Solid Zipper Hooded Sweatshirt | Front Zip, Ribbed Hem, Lined Hood, Casual Winter Wear | Winter Wear for Women's</p>
            <hr className='text-gray-400'/>
            
            <div className='my-5'>
        <div className='text-center   sm:text-2xl md:text-3xl lg:text-3xl'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
    </div>

    <RelatedProduct category={product.category} subCategory={product.subCategory}/>
    
      </div>
    </>
  ) : <div className='opacity-0'>Loading...</div>
}

export default Product