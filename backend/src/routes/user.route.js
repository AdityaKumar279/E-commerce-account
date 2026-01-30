import express from 'express';
import { registerUser, loginUser, logoutUser, adminLogin} from '../controllers/user.controller.js';


const userRouter = express.Router();


// route for user registration
userRouter.post('/register', registerUser);

// route for user login
userRouter.post('/login', loginUser);
userRouter.post('/admin/login', adminLogin);
// route for user logout
userRouter.post('/logout', logoutUser);

export default userRouter;