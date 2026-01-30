import express from 'express'
import { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,upDateStatus, userOrders} from '../controllers/orderController.js'
import authUser from '../middleware/cart.auth.js'
import adminAuth from '../middleware/admin.auth.js'


const orderRoute = express.Router()

orderRoute.post('/list', adminAuth, allOrders )
orderRoute.post('/status', adminAuth, upDateStatus)

// payment features
orderRoute.post('/place',authUser, placeOrder)
orderRoute.post('/stripe', authUser, placeOrderStripe)
orderRoute.post('/razorpay', authUser, placeOrderRazorpay)

// User feature
orderRoute.post('/userorders', authUser,  userOrders)


export default orderRoute
