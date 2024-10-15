import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { paypal } from "../../utils/paypal.js";

const createOrder = asyncHandler( async (req, res) => {
 
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

       throw new ApiError(500, "Failure while making Payment!!")
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json(
          new ApiResponse(201, { approvalURL,
            orderId: newlyCreatedOrder._id,
          }, "Order created successfully!!"));
      }
    });
  
});

const capturePayment = asyncHandler( async (req, res) => {

    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found!!")
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
       throw new ApiError(400, `Not enough stock for this product ${product.title}`)
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json(
        new ApiResponse(200, order, "Order confirmed!!"));
 
});

const getAllOrdersByUser = asyncHandler( async (req, res) => {
  
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      throw new ApiError(404, "No orders found!!")
    }

    res.status(200).json(
        new ApiResponse(200, orders, "Success!!")
    );
 
});

const getOrderDetails = asyncHandler( async (req, res) => {
 
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      throw new ApiError(404, "Order not found!!")
    }

    res.status(200).json(
        new ApiResponse(200, order, "Order fetched successfully!!")
    );
 
});

export {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};