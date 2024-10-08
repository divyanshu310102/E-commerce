import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadFileToCloudinary } from "../../utils/cloudinary.js";

// Define the file upload controller
const uploadFileController = asyncHandler(async (req, res) => {
  // console.log("hello")
  
    // Check if file is available in the request
    if (!req.file) {
      throw new ApiError(400, "File not found!!");
    }

    // Path of the file uploaded locally by Multer
    const localFilePath = req.file.path;
    // console.log(localFilePath)

    
    const cloudinaryResponse = await uploadFileToCloudinary(localFilePath);
    

    if (!cloudinaryResponse) {
      throw new ApiError(500, "File upload to Cloudinary failed.")
    }

    

    // Send success response with Cloudinary file details
    return res
    .status(200)
    .json(new ApiResponse(200, {url: cloudinaryResponse.url}, "Image uploaded successfully"))

  
});


//add a new product
const addProduct = asyncHandler(async (req, res) => {
   
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
      } = req.body;
      console.log(req.body)

      
  
     
      // if (!req.file) {
      //   throw new ApiError(400, "Image not found");
      // }
  
      // // Upload the image to Cloudinary
      // const cloudinaryResponse = await uploadFileToCloudinary(req.file.path);
  
      // if (!cloudinaryResponse) {
      //   throw new ApiError(500, "Image upload to Cloudinary failed.");
      // }
  
      // Create new product with the Cloudinary image URL
      const product = await Product.create({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
      });
  
      const newlyCreatedProduct = await Product.findById(product._id);

      if (!newlyCreatedProduct) {
        throw new ApiError(200, "Some Error Occured while creating a Product");
      }
  
      res.status(200)
      .json(
        new ApiResponse(200, newlyCreatedProduct, "Product created Successfully!!")
      )
    
  });


  //fetch all products

const fetchAllProducts = asyncHandler( async (req,res) => {
    try {
      const listOfProducts = await Product.find({});
      res.status(200).json(
        new ApiResponse(200, listOfProducts, "Products fetched successfully!!")
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  })


  //edit a product
  const editProduct = asyncHandler( async (req, res) => {
    try {
      const { id } = req.params;
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
      } = req.body;
  
      // Find the product
      const product = await Product.findById(id);
      if (!product) {
        throw new ApiError(400, "Product not found!!");
      }
  
      // Prepare updates (only update fields that are provided)
      const updates = {
        title,
        description,
        category,
        brand,
        totalStock,
        image,
        averageReview,
        price: price === "" ? 0 : price,
        salePrice: salePrice === "" ? 0 : salePrice,
      };
  
      // Update only the provided fields (skip undefined ones)
      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          product[key] = updates[key];
        }
      });
  
      // Save the product
      await product.save();
  
      // Send success response
      res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
    } catch (e) {
      // Improved error handling/logging
      console.error("Error updating product:", e);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the product",
      });
    }
  });


  //delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
  
      if (!product){
        throw new ApiError(400, "Product not Found!!")
      }
       
  
      res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully!!"));
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  });
  
 
  
  

export { uploadFileController, addProduct, editProduct,deleteProduct,fetchAllProducts };

