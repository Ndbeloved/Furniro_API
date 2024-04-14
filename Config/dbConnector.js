import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
let DBNAME

if(process.env.ENVIRONMENT == 'prod'){
    console.log('production environment')
    DBNAME = process.env.MONGO_URL_PROD
}else if(process.env.ENVIRONMENT == 'test'){
    console.log('test environment')
    DBNAME = process.env.MONGO_URL_TEST
}
const PORT = process.env.PORT || 3000

export async function connectDB(App){
    mongoose.connect(DBNAME)
    .then(()=>{
        console.log('connected to db');
        App.listen(PORT, ()=>{
            console.log(`server running on http://localhost:${PORT}`);
        })
    })
    .catch(()=>{
        console.log('error connecting to db');
    })
}
