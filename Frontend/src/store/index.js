import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice/index.jsx'
import adminProductSlice from '../features/Admin/products.slice.js'
import shopCartSlice from "../features/Shop/cart.slice.js"
import adminOrderSlice from "../features/Admin/order.slice.js"
import shopProductsSlice from "../features/Shop/product.slice.js"
import shopReviewSlice from "../features/Shop/review.slice.js"
import shopAddressSlice from "../features/Shop/address.slice.js"



export const store = configureStore({
    reducer : {
        authSlice: authReducer, 


        adminProducts : adminProductSlice,
        adminOrder: adminOrderSlice,

        shopCart: shopCartSlice,
        shopProducts: shopProductsSlice,
        shopAddress: shopAddressSlice,
        shopReview: shopReviewSlice,
        
    }
})

export default store;