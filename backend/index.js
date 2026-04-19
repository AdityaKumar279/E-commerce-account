import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/db.js';
import connectCloudinary from './src/config/cloudinary.js';
import userRouter from './src/routes/user.route.js';
import productRout from './src/routes/product.route.js';
import cartRoute from './src/routes/cart.route.js';
import orderRoute from './src/routes/order.route.js';


// App config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary()

// middlewares
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())




// routes
app.use('/api/users', userRouter);
app.use('/api/products', productRout )
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

// api endpoints
app.get('/', (req, res) => {
    res.send('API is running...');
});



app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`);
});