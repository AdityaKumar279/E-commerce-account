import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import transporter from "../config/nodemailer.js";

// route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate user input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    // validate email & password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is not strong enough", success: false });
    }
    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({ message: 'Password is not strong enough' });
    // }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Welcome to Our E-commerce App",
      text: `Hi ${user.name}, welcome to our E-commerce app!
      your account has been successfully created with ${user.email}. You can now log in and start shopping. We offer a wide range of products at competitive prices, and we are committed to providing you with the best shopping experience possible.
      If you have any questions or need assistance, please don't hesitate to contact our customer support team. We are here to help you with anything you need.
      Thank you for choosing our E-commerce app, and we look forward to serving you!`,
    });


    return res.status(200).json({
      success: true,
      message: "User registered in successfully",})

    // res.status(201).json({
    //   success: true ,
    //   message: "User registered successfully",
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     token: token,
    //   },
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields", success: false });
    }

    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
            return res.status(400).json({
                success: false,
                massage: "Invalid email or password"
            });
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",})

    // if (isMatch) {
    //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //   res.status(200).json({
    //     success: true,
    //     message: "User logged in successfully",
    //     user: {
    //       id: user._id,
    //       name: user.name,
    //       email: user.email,
    //       token: token,
    //     },
    //   });
    // } else {
    //   return res.status(400).json({ message: "Invalid credentials", success: false });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// route for user logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return  res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields", success: false });
    }

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign( email+password , process.env.JWT_SECRET);
      res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",})
    }else{
      res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const AdminLogout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return  res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const sendOtpVerificationEmail = async (req, res) => {
  try{
    const userId = req.body;
    
    const user = await userModel.findById(userId);
    
    if(user.isAccountVerified){
      return res.status(400).json({message: "Account is already verified"});
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // OTP expires in 1 day
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP for account verification is: ${otp}. It will expire in 24 hours.`,
    });

    res.status(200).json({ message: "Verification email sent successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to send verification email" });
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === '') {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP" });
  }
}


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
   const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 30 * 60 * 1000; // OTP expires in 1 minute
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 1 minute.`,
    });

    res.status(200).json({ success: true, message: "Password reset OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
}

const verifySendOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.resetOtp !== otp || user.resetOtp === '') {
      return res.status(400).json({  success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.resetOtpExpireAt) {
      return res.status(400).json({  success: false, message: "OTP has expired" });
    }

    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({  success: false, message: "Failed to reset password" });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password is not strong enough" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
}

export { registerUser, loginUser, logoutUser, adminLogin,AdminLogout,
  sendOtpVerificationEmail, verifyOtp, forgetPassword, verifySendOtp, resetPassword
};
