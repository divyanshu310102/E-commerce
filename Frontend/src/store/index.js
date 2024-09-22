import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice/index.jsx'


export const store = configureStore({
    reducer : {
        authSlice: authReducer
        
    }
})

export default store;