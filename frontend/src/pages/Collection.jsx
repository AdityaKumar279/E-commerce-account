import React, { useContext, useEffect, useState } from 'react'
import Card from '../components/Card'
import { StoreContext } from '../store/StoreContext'
import InfiniteScroll from 'react-infinite-scroll-component';

function Collection() {
  const {products,fetchProducts} = useContext(StoreContext)
  const [show, setShow] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // const [size, setSize] = useState([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const toggleCategory = (e) => {
    if(Category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // const toggleSize = (e) => {
  //   if(size.includes(e.target.value)){
  //     setSize(prev => prev.filter(item => item !== e.target.value))
  //   }else{
  //     setSize(prev => [...prev, e.target.value])
  //   }
  // }

  const applyFilter = () => {
    let temp = products.slice();
    if(Category.length > 0){
      
      temp = temp.filter(item => Category.includes(item.category)); 
      
    }
    if(subCategory.length > 0){
      temp = temp.filter(item => subCategory.includes(item.subCategory))
      
    }

    // if(size.length > 0){
    //   temp = temp.filter(item => size.includes(item.sizes[0]))
    //   
    // }
    setFilterProducts(temp)
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  },[Category, subCategory, products])


  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };


  return (
    <>
    <div className='flex flex-col md:flex-row lg:flex-row justify-between'>
      
      
      <div onClick={() => setShow((e) => !e)} className='flex items-center gap-1.5 pt-2  w-25 sm:hidden'>
        <h1 className='font-bold text-lg'>Category</h1>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square" viewBox="0 0 16 16">
  <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0z"/>
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
</svg>
      </div>
      <div className={` min-w-50  my-6 ${show ? 'hidden' : 'block'} md:block lg:block `}>
        <div className='my-5 bg-amber-100 pl-4'>
          <div className=' flex justify- items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' type="checkbox" value={"Men"} onChange={ toggleCategory} /> MAN</label>
        </div>
          <div className=' flex  items-center my-1'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' type="checkbox" value={"Women"} onChange={ toggleCategory} /> WOMAN</label>
        </div>
          <div className=' flex  items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' type="checkbox" value={"Kids"} onChange={ toggleCategory} /> KID</label>
        </div>
        </div>
        <div className='my-5 bg-amber-100 pl-4'>
          <div className=' flex justify- items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' type="checkbox" value={"Topwear"} onChange={toggleSubCategory}/> TOPWEAR</label>
        </div>
          <div className=' flex  items-center my-1'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} /> BOTTOMWEAR</label>
        </div>
          <div className=' flex  items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} /> WINTERWEAR</label>
        </div>
        </div>
        <div className='my-5 bg-amber-100 pl-4'>
          {/* <div className=' flex justify- items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' onChange={toggleSize} type="checkbox" value={"S"} /> S</label>
        </div>
          <div className=' flex  items-center my-1'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' onChange={toggleSize} type="checkbox" value={"M"} /> M</label>
        </div>
          <div className=' flex  items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' onChange={toggleSize} type="checkbox" value={"L"} /> L</label>
        </div>
          <div className=' flex  items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' onChange={toggleSize} type="checkbox" value={"XL"} /> XL</label>
        </div>
          <div className=' flex  items-center my-2'>
          <label className='font-bold cursor-pointer'><input className='cursor-pointer' onChange={toggleSize} type="checkbox" value={"XXL"} /> XXL</label>
        </div> */}
        </div>

      </div>

    <InfiniteScroll
        dataLength={products.length} // This is crucial so the library knows when to trigger 'next'
        next={fetchMoreData}         // The function to call for the next page
        hasMore={hasMore}            // Boolean telling it if there is more data to fetch
        loader={<h4 style={{ textAlign: 'center' }}>Loading more items...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen all the products!</b>
          </p>
        }>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 my-6 '>
        {
            filterProducts.map((product, index) =>(
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
    </InfiniteScroll>
    </div>
    </>
  )
}

export default Collection