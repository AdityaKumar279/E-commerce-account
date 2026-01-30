import orderModel from "../models/orderModel.js";
import userModel from "../models/user.model.js";



// placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const {productId, items, amount, address} = req.body;

        const orderData = {
            userId: productId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Number(Date.now())
        }
        const newOrder = orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(productId, {cartData: {}})
        res.status(200).json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }
}

// placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    
}

// placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    
}

// user orders data for Frontend
const userOrders = async (req, res) => {
    try {
        const {productId} = req.body

        const orderData = await orderModel.find({userId:productId})
        res.status(200).json({success: true, orderData})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }
}

// user orders data for Frontend
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json({success: true, orders})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }
    
}

// upDate order status
const upDateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.status(200).json({success: true, message: "Order Status Updated"})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    upDateStatus,
    userOrders
}