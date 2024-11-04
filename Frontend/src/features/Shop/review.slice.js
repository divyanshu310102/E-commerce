import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,  // Add an error state to handle any API errors
};

// Async action for adding a review
export const addReview = createAsyncThunk(
  "review/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      
      const response = await axios.post( 
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/shop/product-review/add`,
        formdata
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async action for getting reviews
export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      console.log(productId)
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/shop/product-review/${productId}`
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle addReview action
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error when loading
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;  // Append new review to reviews list
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Store error message
      });

    // Handle getReviews action
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;  // Set fetched reviews
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];  // Clear reviews on error
        state.error = action.payload;  // Store error message
      });
  },
});

export default reviewSlice.reducer;
