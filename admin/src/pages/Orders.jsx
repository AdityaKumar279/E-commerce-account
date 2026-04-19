import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUri } from "../App";
import { useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import currency from "../App";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const FetchAllOrder = async () => {
    if (!token) {
      return null;
    }

    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(
        `${backendUri}/api/order/list`,
        {},
        
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      
    }
  };

  const FetchStatus = async (event, orderId) => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`${backendUri}/api/order/status`, {orderId,status:event.target.value})
    if(response.data.success){
      await FetchAllOrder();
      
    }
    } catch (error) {
      
    }
  } 
  
  useEffect(() => {
    FetchAllOrder();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div className="">
        {orders.map((order, index) => (
          <div className="sm:flex p-3 justify-between items-center border gap-2 mt-3" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div className="">
              <div>
                {order.items.map((item, index) => {
                  if (index === orders.length - 1) {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
                <div>
                  <p>
                    {order.address.firstName +
                      " " +
                      order.address.lastName}{" "}
                  </p>
                  <div>
                    <p>{order.address.street + ", "}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zip}
                    </p>
                    <p>Phone No: {order.address.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p className="font-bold text-gray-700 text-[14px]">Payment : {order.payment ? "Done" : "pending"}</p>
              <p className="text-blue-600">Date : {new Date(order.date).toLocaleDateString()}</p>
              <div>
                <p className="text-gray-900 font-bold">₹{order.amount}</p>
                <select  onChange={(event) => FetchStatus(event, order._id)} value={order.status} className="font-bold py-1 px-2 mt-3"   >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
