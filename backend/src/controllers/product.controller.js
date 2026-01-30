import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

// function for  add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      sizes,
      subCategory,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUri = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const product = new productModel({
      name,
      price: Number(price),
      description,
      category,
      sizes: JSON.parse(sizes),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      date: Number(new Date().getTime()),
      images: imageUri,
    });

    await product.save();
    res.status(200).json({ 
      success: true,
      message: "Product added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error" });
  }
};

// function for remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(201).json({
        product,
        success: true,
        message: "Single product fetched successfully"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listProduct = async (req, res) => {
  try {
    const list = await productModel.find({})
        res.status(201).json({
            list,
            success: true,
            message: "Product list fetched successfully"
        })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server problem"
    })
  }
};

export { addProduct, removeProduct, singleProduct, listProduct };
