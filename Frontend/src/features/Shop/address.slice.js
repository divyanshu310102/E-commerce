import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
  error: null, 
};


export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async (formData, {rejectWithValue }) => {
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/shop/address/add-address`,
        formData
      );
      console.log(response.data.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add address");
    }
  }
);


export const fetchAllAddresses = createAsyncThunk(
  "addresses/fetchAllAddresses",
  async ({userId}, {rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/shop/address/fetch-address/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch addresses");
    }
  }
);

// Edit address async thunk
export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/shop/address/edit-address/${userId}/${addressId}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit address");
    }
  }
);

// Delete address async thunk
export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/shop/address/delete-address/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete address");
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add New Address
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Clear any previous error
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        // state.addressList = (action.payload.data.addressList);  // Add the new address to the list
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  // Set the error message
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Clear previous error
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.data.addressList)
        state.addressList = action.payload.data.addressList;  // Update the address list with fetched data
      })
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];  // Clear the list on failure
        state.error = action.payload;  // Set the error message
      });

//     // Edit Address
//     builder
//       .addCase(editAddress.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(editAddress.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const updatedAddress = action.payload.data;
//         const index = state.addressList.findIndex(
//           (address) => address._id === updatedAddress._id
//         );
//         if (index !== -1) {
//           state.addressList[index] = updatedAddress;  // Update the modified address
//         }
//       })
//       .addCase(editAddress.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });

//     // Delete Address
//     builder
//       .addCase(deleteAddress.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteAddress.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const addressId = action.meta.arg.addressId;
//         state.addressList = state.addressList.filter(
//           (address) => address._id !== addressId
//         );  // Remove the deleted address
//       })
//       .addCase(deleteAddress.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
  },
});

export default addressSlice.reducer;
