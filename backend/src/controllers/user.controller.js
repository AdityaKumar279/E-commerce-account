import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      success: true ,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
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

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// route for user logout
const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// rout for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields", success: false });
    }

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign( email+password , process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",token,
        Admin: "Aditya Kumar"
      });
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

export { registerUser, loginUser, logoutUser, adminLogin };
