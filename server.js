import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./Config/dbConnector.js"
dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Home page")
})

connectDB(app)

app.use((req, res, next)=>{
    res.status(404).json({message: "page not found"})
})