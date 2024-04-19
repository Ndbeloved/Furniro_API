import express from "express"
import { User } from "../Service/userAuthentication.js"
const router = express.Router()

router.post('/', async(req, res)=>{
    try{
        const {token} = req.body
        const user = new User()
        const result = await user.create(token)
        res.status(200).json({token: result})
    }catch(err){
        console.log(err)
    }
})

router.post('/token', async(req, res)=>{
    try{
        const user = new User()
        const {token} = req.body
        await user.loggedIN(token)
        res.status(200).json({message: "success"})
    }catch(err){
        console.log(err)
    }
})

export default router