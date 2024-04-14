import { GoogleToken } from "./googleAuth.js";
import { JwtToken } from "./JWT.js";
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
            const isUser = await this.userExist(email)
            
            //if user not found in db, create new user and session token
            if(!isUser){
                const newUser = new UserModel({
                    username,
                    email
                })
                const user = await newUser.save()
                const createSession = new JwtToken()
                const userID = user._id
                const jwttoken = createSession.createToken(userID, email, username)
                return jwttoken
            }
            const createSession = new JwtToken()
            const userID = isUser._id
            const jwttoken = createSession.createToken(userID, email, username)
            return jwttoken
        }catch(err){
            console.log(err);
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

    async userExist(email){
        const user = await UserModel.findOne({email: email})
        if(!user) return false
        return user
    }

    async loggedIN(jwtToken){
        const JWT = new JwtToken()
        const payload = await JWT.verifyToken(jwtToken)
        console.log(payload)
    }
}

export {User}