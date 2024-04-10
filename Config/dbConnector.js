import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const DBNAME = process.env.MONGO_URL
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
