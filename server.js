import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {connectDB} from "./Config/dbConnector.js"
import { uploadImage } from "./Service/uploadImage.js"
import { multerConf } from "./Config/multerConfig.js"
import { corsSetting } from "./Config/CorsConfig.js"
import adminRoute from "./routes/admin.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
app.use(corsSetting)
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

multerConf()

app.use('/admin', adminRoute)
app.use('/user', userRoute)

app.get('/', (req, res)=>{
    res.send("Home page")
})

connectDB(app)

app.use((req, res, next)=>{
    res.status(404).json({message: "page not found"})
})