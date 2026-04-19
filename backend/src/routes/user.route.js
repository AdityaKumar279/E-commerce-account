import express from 'express';
import { registerUser, loginUser, logoutUser, adminLogin, sendOtpVerificationEmail, verifyOtp, resetPassword, forgetPassword, verifySendOtp} from '../controllers/user.controller.js';
import authUsers from '../middleware/userAuth.js';


const userRouter = express.Router();


// route for user registration
userRouter.post('/register', registerUser);
// route for user login
userRouter.post('/login', loginUser);
userRouter.post('/send-otp', authUsers, sendOtpVerificationEmail);
userRouter.post('/verify-otp', authUsers, verifyOtp);
userRouter.post('/forget-password', forgetPassword);
userRouter.post('/verify-send-otp', verifySendOtp);
userRouter.post('/reset-password',  resetPassword);


// userRouter.post('/reset-password/:email',  resetPassword);



userRouter.post('/admin/login', adminLogin);
// route for user logout
userRouter.post('/logout', logoutUser);

export default userRouter;