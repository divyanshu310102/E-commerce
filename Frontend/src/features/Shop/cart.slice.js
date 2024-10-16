import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  cartItems: [],
  isLoading: false,
  cartItemsId: null,
  error: null,
};

// API calls as async thunks
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const  {data}  = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/shop/cart/add-to-cart`,
      { userId, productId, quantity }
    );
    
    console.log(data)
    return data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({userId}) => {  
    const  {data}  = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/shop/cart/fetch-cart-items/${userId}`
    );

    console.log("Success",data)
    return data;
    
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/shop/cart/delete-cart-item/${userId}/${productId}`
    );
    return data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/shop/cart/update-cart`,
      { userId, productId, quantity }
    );
    
    return data;
  }
);

// Helper function to handle common state transitions
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  // console.log(action.payload.data.items)
  state.isLoading = false;
  state.cartItems = action.payload.data.items;
  state.cartItemsId = action.payload.data._id
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error?.message || "Something went wrong";
};

// Create Slice
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, handleFulfilled)
      .addCase(addToCart.rejected, handleRejected)

      // Fetch cart items
      .addCase(fetchCartItems.pending, handlePending)
      .addCase(fetchCartItems.fulfilled, handleFulfilled)
      .addCase(fetchCartItems.rejected, handleRejected)

      // Update cart quantity
      .addCase(updateCartQuantity.pending, handlePending)
      .addCase(updateCartQuantity.fulfilled, handleFulfilled)
      .addCase(updateCartQuantity.rejected, handleRejected)

      // Delete cart item
      .addCase(deleteCartItem.pending, handlePending)
      .addCase(deleteCartItem.fulfilled, handleFulfilled)
      .addCase(deleteCartItem.rejected, handleRejected);
  },
});

export default shoppingCartSlice.reducer;
