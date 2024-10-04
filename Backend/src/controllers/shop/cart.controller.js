import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



const addToCart = asyncHandler(async (req, res) => {

    const { userId, productId, quantity } = req.body;
    
  
    if (!userId || !productId || quantity <= 0) {
      throw new ApiError(400, "Invalid data provided!!");

    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(400, "Product not found!!")
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // console.log(findCurrentProductIndex)

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    

    cart.markModified('items');
    
    // Save the cart to the database
    await cart.save();

    // Log the saved cart
    console.log('Cart after saving:', cart);

    

    return res.status(200)
    .json(
        new ApiResponse(200, cart, "Product added to cart successfully!!")
    )

    
})



const fetchCartItems = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
     throw new ApiError(400, "User id is manadatory!")
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      throw new ApiError(400, "Cart not found!!")
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    console.log(populateCartItems)

    return res.status(200)
    .json(new ApiResponse(200, {...cart._doc,
        items: populateCartItems,}, "Fetched product Successfully!!"))

})



const updateCartItemQty = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      throw new ApiError(400, "Invalid data provided!")
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new ApiError(400, "Cart not found!!")
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      throw new ApiError(400, "Cart item is not present!!")
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200)
   .json(new ApiResponse(200, {...cart._doc,items: populateCartItems},"Cart updated successfully!!"))

})




const deleteCartItem = asyncHandler(async (req, res) => {
    
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      throw new ApiError(400, "Invalid data provided!!")
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      throw new ApiError(400, "Cart not found!!")
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200)
   .json(new ApiResponse(200, {...cart._doc, items: populateCartItems},"Cart item deleted successfully!!"))

})

export { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem }