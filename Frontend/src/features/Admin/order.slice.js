import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
};

// Helper function to reduce repetitive loading state management
const setLoading = (state, status) => {
  state.isLoading = status;
};

// Thunks
export const getAllOrdersForAdmin = createAsyncThunk(
  "order/getAllOrdersForAdmin",
  async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/order/get-orders`);
    return data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "order/getOrderDetailsForAdmin",
  async (id) => {
    const { data } = await axios.get(`/api/v1/admin/order/get-details/${id}`);
    return data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/order/update-order/${id}`,
      { orderStatus }
    );
    return data;
  }
);

// Slice
const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllOrdersForAdmin
      .addCase(getAllOrdersForAdmin.pending, (state) => setLoading(state, true))
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        setLoading(state, false);
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        setLoading(state, false);
        state.orderList = [];
      })

      // getOrderDetailsForAdmin
      .addCase(getOrderDetailsForAdmin.pending, (state) => setLoading(state, true))
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        setLoading(state, false);
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        setLoading(state, false);
        state.orderDetails = null;
      });
  },
});

// Exports
export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
