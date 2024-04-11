import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./Config/dbConnector.js"
import { uploadImage } from "./Service/uploadImage.js"
import { multerConf } from "./Config/multerConfig.js"
import adminRoute from "./routes/admin.js"
dotenv.config()
const app = express()
app.use(express.json())

multerConf()

app.use('/admin', adminRoute)

app.get('/', (req, res)=>{
    res.send("Home page")
})

connectDB(app)

app.use((req, res, next)=>{
    res.status(404).json({message: "page not found"})
})