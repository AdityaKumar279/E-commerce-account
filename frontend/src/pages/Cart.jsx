import { useNavigate } from 'react-router-dom';
import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { StoreContext } from "../store/StoreContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { product, currency, cartItems, navigator,  UpdateQuantity, getCartAmount } = useContext(StoreContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if(product.length > 0){
      const tempData = [];

    for (const itemid in cartItems) {
      for (const size in cartItems[itemid]) {
        if (cartItems[itemid][size] > 0) {
          tempData.push({
            _id: itemid,
            size: size,
            quantity: cartItems[itemid][size],
          });
        }
      }
    }
    setCartData(tempData);

    }
    
  }, [cartItems, product]);

  return (
    <>
      <Title text1={"MY"} text2={"ORDERS"} />

      <div >
        {/*---------Product List Data ---------*/}
        {cartData.map((item, index) => {
          const productData = product.find((items) => item._id === items._id)
          console.log(productData);
          return(
            <div key={productData._id} className="flex justify-between align-middle items-center mt-10 border-t border-b py-2" >
                <div className="flex gap-4">
                    <div>
                        <img className="w-16 sm:w-20" src={productData.images[0]} alt="" />
                    </div>
                    <div className="flex flex-col gap-1 pt-2">
                        <h2 className="font-semibold">{productData.name}</h2>
                            <p>Size: {item.size}</p>
                            <p>Price: {currency}{productData.price}</p>
                    </div>
                   
                </div>
                <div>
                    <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : UpdateQuantity(item._id, item.size, Number(e.target.value))} type="number" value={item.quantity} className="border w-15 items-center pl-2" />
                </div>
                 <div className="flex gap-2">
                            <button onClick={() =>  UpdateQuantity(item._id, item.size,0)} className="bg-red-500 h-10 text-white px-2 py-1 rounded-md cursor-pointer">Remove</button>
                        </div>

            </div>
          )
          
        })}

        {getCartAmount() === 0 ?
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl">Cart is Empty!</div>
        </div>
        :  <div className="flex justify-end my-20">
          <div className="w-full sm:w-112.5">
            <CartTotal/>
          
          <div className="flex justify-end mt-8">
            <button onClick={() => navigator('/placeOrder')} className="bg-black text-white py-3 px-8 rounded-sm cursor-pointer">PROCEED TO CHECKOUT</button>
          </div>
          </div>

        </div> }

      
       
        
      </div>
    </>
  );
}

export default Cart;
