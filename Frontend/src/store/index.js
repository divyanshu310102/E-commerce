import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice/index.jsx'
import adminProductSlice from '../features/Admin/products.slice.js'

export const store = configureStore({
    reducer : {
        authSlice: authReducer,
        adminProducts : adminProductSlice,
        
    }
})

export default store;