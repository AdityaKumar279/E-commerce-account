import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import axios from 'axios'
import { backendUri } from '../App'
import { toast } from 'react-toastify'

function Add({token}) {

  const [loading, setLoading] = useState(false)

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const imageHandlers = (e) => {
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
  }
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState([]);
  const [bestseller, setBestseller] = useState(false)

  const onSubmitHandler = async (e) => {
    try {
       e.preventDefault();
       setLoading(true)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('sizes', JSON.stringify(size));
    formData.append('bestseller', bestseller);
    image1 && formData.append('image1', image1);
    image2 && formData.append('image2', image2);
    image3 && formData.append('image3', image3);
    image4 && formData.append('image4', image4);

    const response = await axios.post(backendUri+'/api/products/add', formData, {headers:{token}});

    if(response.data.success) {
      toast.success('Product Added Successfully')
      setName('');
      setDescription('');
      setCategory('Men');
      setSubCategory('Topwear');
      setPrice('');
      setSize([]);
      setBestseller(false);
      imageHandlers();
    } else {
      toast.error('Failed to add product');
    }
   

    } catch (error) {
      console.log(error, "server error");
      toast.error('Something went wrong')
    }finally {
    setLoading(false)
  }

  } 


  return (
    <>
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col w-full items-start gap-3'>
      <h1 className='text-2xl font-bold mb-4'>Add New Item</h1>
         <div>
            <p className='mb-4 font-bold'>Upload Images</p>

            <div className='flex gap-2'>
              <label htmlFor="image1">
                <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                <input  onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
              </label>
              <label htmlFor="image2">
                <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
              </label>
              <label htmlFor="image3">
                <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                <input  onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
              </label>
              <label htmlFor="image4">
                <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                <input  onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
              </label>

             
            </div>
             <div onClick={() => imageHandlers()} className=' my-3 w-25 sm:h-8 text-white bg-red-400 rounded-sm cursor-pointer flex justify-center items-center'><p>Remove</p></div>
         </div>

         <div className='w-full'>
          <p className='mb-2 font-bold'>Product Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} placeholder='Type Here' type="text" className='w-full max-w-125 px-3 py-2' required />
         </div>
         <div className='w-full'>
          <p className='mb-2 font-bold'>Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="" id="" cols="30" rows="10" placeholder='Type Here Description' type="" className='w-full max-w-125 px-3 py-2' required />
         </div>

         <div className=' flex flex-col  md:flex-row gap-3 w-full sum:gap-8 '>
          <div>
            <p className='mb-2 font-bold'>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2' name="" id="">
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
          </div>

          <div>
            <p className='mb-2 font-bold'>Sub Category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' name="" id="">
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="winterwear">Winterwear</option>
            </select>
          </div>

         <div>
            <p className='mb-2 font-bold'>price</p>
            <input onChange={(e) => setPrice(e.target.value)} className='w-full  px-3 py-2 sum:w-120px' type="number" placeholder='00.0' required/>
          </div>

         </div>
          
          <div>
            <p className='mb-2 font-bold'>Product Size</p>
            <div className='flex gap-3'>
            <div onClick={() => setSize(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
              <p className={`${size.includes("S") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>S</p>
            </div>
            <div onClick={() => setSize(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
              <p className={`${size.includes("M") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>M</p>
            </div>
            <div onClick={() => setSize(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
              <p className={`${size.includes("L") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>L</p>
            </div>
            <div onClick={() => setSize(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
              <p className={`${size.includes("XL") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>XL</p>
            </div>
            <div onClick={() => setSize(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
              <p className={`${size.includes("XXL") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>XXL</p>
            </div>
            </div>
          </div>
         

         <div className='flex gap-2 mt-2'>
         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='cursor-pointer'/>
         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
         
         </div>

         <button type="submit" className='w-28 py-2 mt-4 bg-black text-white rounded-sm cursor-pointer'> {loading ? "Adding..." : "Add Product"}</button>
         
    </form>
    </>
  )
}

export default Add