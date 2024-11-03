import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routes/User/user.route.js'
import { errorHandler } from './middlewares/Error-Handler/errorHandler.js';
import adminProductRouter from "./routes/Admin/admin.product.route.js"
import addressRouter from "./routes/Shop/address.route.js"
import cartRouter from "./routes/Shop/cart.route.js"
import productRouter from "./routes/Shop/product.route.js"
import searchRouter from "./routes/Shop/search.route.js"
import adminOrderRouter from "./routes/Admin/admin.order.route.js"
import reviewRouter from "./routes/Shop/review.route.js"
import featureRouter from "./routes/common/feature.route.js"
import shopOrderRouter from "./routes/Shop/order.route.js"

const app = express();


app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(cookieParser())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin/product",adminProductRouter)
app.use("/api/v1/admin/order",adminOrderRouter)
app.use("/api/v1/shop/address",addressRouter)
app.use("/api/v1/shop/cart",cartRouter)
app.use("/api/v1/shop/product",productRouter)
app.use("/api/v1/shop/search",searchRouter)
app.use("/api/v1/shop/product-review",reviewRouter)
app.use("/api/v1/common/feature",featureRouter)
app.use("/api/v1/shop/order",shopOrderRouter)

app.use(errorHandler)     

export  {app};
