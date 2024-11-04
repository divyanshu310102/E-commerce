import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'


// dotenv.config({
// })
// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"



connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Server connection error!!", err)
})