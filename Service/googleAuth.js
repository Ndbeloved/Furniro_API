import {OAuth2Client} from "google-auth-library"
const googleID = process.env.Google_Client_Id
const client = new OAuth2Client(googleID)

class GoogleToken{

    async isValid(token){
        try{
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: googleID,
            }) 
            const payload = ticket.getPayload()
            if(!payload.email_verified){
                return false
            }
            return payload
        }catch(err){
            console.log(err)
            return false
        }
    }
}

export {GoogleToken}