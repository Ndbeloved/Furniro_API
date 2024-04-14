import express from "express"
import { User } from "../Service/userAuthentication.js"
const router = express.Router()

router.post('/', async(req, res)=>{
    const {token} = req.body
    const user = new User()
    const result = await user.create(token)
    res.status(200).json({jwt: result})
})

router.get('/token', async(req, res)=>{
    try{
        const user = new User()
        await user.loggedIN("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyYXN0dXMgQmVsb3ZlZCIsImVtYWlsIjoiYmVsb3ZlZGVyYXN0dXNAZ21haWwuY29tIiwiaWQiOiI2NjFiMzAyNzYzY2I4Y2ViMTExNDUzNjgiLCJpYXQiOjE3MTMwOTAzOTgsImV4cCI6MTcxMzE3Njc5OH0.btiOxiypHnYW2FEYywQncHwIRZOolWSYeG5QS1PcMUM")
        res.status(200).json({message: "success"})
    }catch(err){
        console.log(err)
    }
})

export default router