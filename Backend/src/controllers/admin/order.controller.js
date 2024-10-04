import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



const getAllOrdersOfAllUsers = asyncHandler(async (req,res) => {
    // Fetch all orders from all users and return them
    const orders = await Order.find({});

    if (!orders.length) {
      throw new ApiError(404, "No orders found");

    }

    return res.status(200)
    .json(
        new ApiResponse(200, orders, "Orders fetched successfully" )

    )

})


const getOrderDetailsForAdmin = asyncHandler(async (req,res) => {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res.status(200)
    .json(
        new ApiResponse(200, order, "Order detail fetched successfully" )

    )
})




const updateOrderStatus = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    return res.status(200)
    .json(
        new ApiResponse(200, order, "Order updated successfully" )
    )
})


export {getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus}
