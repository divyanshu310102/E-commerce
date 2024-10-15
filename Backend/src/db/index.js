import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected successfully & Host: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.log("DB connection failure!!",error)
    }

}

export default connectDB;