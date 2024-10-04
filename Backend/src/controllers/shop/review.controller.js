import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { Review } from "../../models/review.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const addProductReview = asyncHandler(async (req, res) => {
  const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

  // Validate input
  if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user has ordered the product
  const order = await Order.findOne({
    userId,
    "cartItems.productId": productId,
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Check if the user has already reviewed the product
  const existingReview = await Review.findOne({
    productId,
    userId,
  });

  if (existingReview) {
    throw new ApiError(400, "You already reviewed this product");
  }

  // Create new review
  const newReview = await Review.create({
    productId,
    userId,
    userName,
    reviewMessage,
    reviewValue,
  });

  // Incrementally update the product's average review and review count
  const product = await Product.findById(productId);
  const updatedReviewCount = (product.reviewCount || 0) + 1;
  const updatedAverageReview =
    ((product.averageReview || 0) * (product.reviewCount || 0) + reviewValue) /
    updatedReviewCount;

  product.averageReview = updatedAverageReview;
  product.reviewCount = updatedReviewCount;

  await product.save();

  return res.status(201).json(
    new ApiResponse(201, newReview, "Review added successfully!")
  );
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Validate input
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  const reviews = await Review.find({ productId });

  return res.status(200).json(
    new ApiResponse(200, reviews, "Reviews fetched successfully")
  );
});

export { addProductReview, getProductReviews };
