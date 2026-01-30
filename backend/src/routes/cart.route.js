import express from 'express' 
import { addToCart, getToCart, updateToCart } from '../controllers/cart.controller.js'
import authUser from '../middleware/cart.auth.js'


const cartRoute = express.Router()

cartRoute.post('/addToCart',authUser, addToCart)
cartRoute.post('/updateToCart',authUser, updateToCart)
cartRoute.post('/getToCart',authUser, getToCart)

export default cartRoute;