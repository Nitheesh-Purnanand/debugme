import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
dotenv.config()
const app = express();
const PORT = process.env.PORT
import authRoute from "./routes/auth.route.js"
app.use(express.json())
app.listen(PORT,()=>{
    console.log("app is listening at port")
    connectdb()
})
app.use("/api/auth",authRoute)