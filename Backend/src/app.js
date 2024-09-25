import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routes/User/user.route.js'
import { errorHandler } from './middlewares/Error-Handler/errorHandler.js';
import adminRouter from "./routes/Admin/admin.route.js"


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

app.use(errorHandler)

export  {app};
