import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
// import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null
}

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/register',
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // If an error occurs, reject with the error response
      return rejectWithValue(
        error.response?.data || { message: 'Registration failed' }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/login',
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // Reject with the error response
      return rejectWithValue(
        error.response?.data || { message: 'Login failed' }
      );
    }
  }
);


const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data?.user;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        // Handle the error payload here
        state.error = action.payload?.message || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log(state.user)
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload?.data?.user : null;
        state.isAuthenticated = action.payload?.success;
        // console.log(state.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        // Handle the error payload here
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const {setUser} = authSlice.actions
export default authSlice.reducer