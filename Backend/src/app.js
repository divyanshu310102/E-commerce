import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from '../src/routes/User/user.route.js'
import { errorHandler } from './middlewares/Error-Handler/errorHandler.js';


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(cookieParser())

app.use("/api/v1/user",userRouter)

app.use(errorHandler)

export  {app};
