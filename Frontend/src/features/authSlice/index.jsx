import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null
}

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/v1/user/register`,
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
        `/api/v1/user/login`,
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

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      `/api/v1/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);


// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",

//   async () => {
//     const response = await axios.get(
//       `/api/v1/user/check-auth`,
//       {                                                //For Localhost only
//         withCredentials: true,
//         headers: {
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate", 
//         },
//       }
//     );

//     return response.data;
//   }
// );



export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async (accessToken) => {
    const response = await axios.get(
      `/api/v1/user/check-auth`,
      {                                                //For Localhost only
        
        headers: {
          Authorization : `Bearer ${accessToken}`,
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate", 
        },
      }
    );

    return response.data;
  }
);


const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user;
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
        console.log(action.payload)
        state.user = action.payload?.success ? action.payload?.user : null;
        state.accessToken = action.payload?.success ? action.payload?.accessToken : null;
        sessionStorage.setItem("accessToken", JSON.stringify(action.payload?.accessToken));
        state.refreshToken = action.payload?.success ? action.payload?.refreshToken : null;
        sessionStorage.setItem("refreshToken", JSON.stringify(action.payload?.refreshToken));
        state.isAuthenticated = action.payload?.success;
        // console.log(state.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });;
  },
});

export const {setUser, resetTokenAndCredentials} = authSlice.actions
export default authSlice.reducer