import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/product.controller.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/admin.auth.js';


const productRout = express.Router()


// Define product routes here
productRout.post('/add',adminAuth , upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]), addProduct )
productRout.post('/remove',adminAuth , removeProduct)
productRout.get('/single', singleProduct )
productRout.get('/list', listProduct)

export default productRout;
