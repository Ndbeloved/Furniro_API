import jwt from "jsonwebtoken"

class JwtToken{
    async createToken(id, email, username){
        const payload = {
            username,
            email,
            id,
        }
        const secret = process.env.JWT_SECRET || "secretkey"
        const token = jwt.sign(payload, secret, {expiresIn: '24h'})
        return token
    }

    async verifyToken(token){
        const secret = process.env.JWT_SECRET
        const payload = jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                console.log('Token verification failed')
                return false
            }
            return decoded
        })
        return payload
    }
}

export {JwtToken}