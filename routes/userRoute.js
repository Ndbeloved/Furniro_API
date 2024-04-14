import express from "express"
import { User } from "../Service/userAuthentication.js"
const router = express.Router()

router.post('/', async(req, res)=>{
    const {token} = req.body
    const user = new User()
    const result = await user.create(token)
    res.status(200).json({result})
})

export default router