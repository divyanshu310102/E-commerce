import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import {asyncHandler} from "../../utils/asyncHandler.js"

const createOrder = asyncHandler(async (req, res) => {
  
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    if([userId,
        cartItems,
        addressInfo,
        totalAmount,
        orderDate,
        orderUpdateDate,
        cartId,
    ].some((field) => field?.trim() === "")){
        throw new Error(400,"All fields are required!")
    }


        const newlyCreatedOrder = await Order.create({
          userId,
          cartId,
          cartItems,
          addressInfo,
          totalAmount,
          orderDate,
          orderUpdateDate,
        });

        const newOrder = await Order.findById(newlyCreatedOrder._id)

        if(!newOrder){
            throw new ApiError(401,"Failed to create new order!")
        }
        
        res.status(201).json(
            new ApiResponse(200, newOrder, "Order created successfully!")
         );
      
    });
  


const getAllOrdersByUser = asyncHandler(async (req, res) => {
 
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!(orders.length)) {
      throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponse(201, orders, "Order confirmed!")
    );
  
});

const getOrderDetails = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponse(200, order, "Order details fetched successfully!")
    );
  
})

export {createOrder, getAllOrdersByUser, getOrderDetails}