import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routes/User/user.route.js'
import { errorHandler } from './middlewares/Error-Handler/errorHandler.js';
import adminRouter from "./routes/Admin/admin.route.js"
import addressRouter from "./routes/Shop/address.route.js"
import cartRouter from "./routes/Shop/cart.route.js"
import productRouter from "./routes/Shop/product.route.js"
import searchRouter from "./routes/Shop/search.route.js"


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(cookieParser())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/shop/address",addressRouter)
app.use("/api/v1/shop/cart",cartRouter)
app.use("/api/v1/shop/product",productRouter)
app.use("/api/v1/shop/search",searchRouter)

app.use(errorHandler)

export  {app};
