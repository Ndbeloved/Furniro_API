import { GoogleToken } from "./googleAuth.js";
import UserModel from "../models/userModel.js"

class User{
    async create(token){
        try{
            const verifyToken = new GoogleToken()
            const payload = await verifyToken.isValid(token)
            if(!payload){
                throw new Error("not a valid token")
            }
            const username = payload.name
            const email = payload.email
            const newUser = new UserModel({
                username,
                email
            })
            await newUser.save()
            return true
        }catch(err){
            return false
        }
    }

    async isAdmin(id){
        const user = await UserModel.findById(id)
        if(!user || !user.isAdmin) return false
        return true
    }

    async get(id){
        const user = await UserModel.findById(id)
        if(!user) return false
        return user
    }
}

export {User}