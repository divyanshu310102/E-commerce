import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const getFilteredProducts = asyncHandler(async (req, res) => {
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

let filters = {};

// Convert query parameters to arrays if not empty
if (category) filters.category = { $in: category.split(",") };
if (brand) filters.brand = { $in: brand.split(",") };

// Sort options mapping
const sortOptions = {
  "price-lowtohigh": { price: 1 },
  "price-hightolow": { price: -1 },
  "title-atoz": { title: 1 },
  "title-ztoa": { title: -1 },
};

// Default to 'price-lowtohigh' if sortBy is not valid
const sort = sortOptions[sortBy] || { price: 1 };

    const products = await Product.find(filters).sort(sort);

    res.status(200).json(
        new ApiResponse(200, products, "Filtered successfully")
    )
})







const getProductDetails = asyncHandler(async (req, res) => {
   const {id} = req.params
   const product = await Product.findById(id)
   if (!product) {
    throw new ApiError(404, "Product not found!")
   }
   return res.status(200)
   .json(
    new ApiResponse(200, product, "Product details fetched successfully!")

   )
})

export {getFilteredProducts, getProductDetails}