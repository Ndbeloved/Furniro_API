import cors from "cors"
const allowedOrigins = ["http://localhost:3000", "furniro-psi.vercel.app"]
const options = {
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
}

const corsSetting = cors(options)
export {corsSetting}