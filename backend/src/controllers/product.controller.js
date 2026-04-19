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
    // 1. Extract page and limit from the request query, with sensible defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 2. Calculate how many documents to skip to get to the requested page
    const skip = (page - 1) * limit;

    // 3. Fetch only the specific chunk of products
    const list = await productModel.find({})
      .skip(skip)
      .limit(limit);

    // 4. Count total documents to let the frontend know when to stop scrolling
    const totalProducts = await productModel.countDocuments();
    const hasMore = skip + list.length < totalProducts;

    // Note: Changed status to 200 (OK) as 201 is typically for creating resources
    res.status(200).json({
      success: true,
      message: "Product list fetched successfully",
      list,
      currentPage: page,
      hasMore, // The frontend will use this to trigger the next fetch
      totalProducts
    });
    
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server problem"
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    // 1. Keyword query se nikalna
    const keyword = req.query.keyword;

    // Agar user ne bina kuch type kiye search API hit ki, toh error bhej dein
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search keyword"
      });
    }

    // 2. Pagination setup (Infinite scroll ke liye zaroori)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 3. Search query banana (Case-insensitive matching ke liye $regex)
    const searchQuery = {
      name: { $regex: keyword, $options: "i" }
    };

    // 4. Products find karna
    const list = await productModel.find(searchQuery)
      .skip(skip)
      .limit(limit);

    // 5. Total count nikalna hasMore check karne ke liye
    const totalProducts = await productModel.countDocuments(searchQuery);
    const hasMore = skip + list.length < totalProducts;

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      list,
      hasMore
    });

  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server problem"
    });
  }
};



const listProducts = async (req, res) => {
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

export { addProduct, removeProduct, singleProduct, listProduct, searchProducts, listProducts };
