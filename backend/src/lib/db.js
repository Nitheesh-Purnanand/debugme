import mongoose from "mongoose"
export const connectdb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connection successful ${conn.connection.host}`)
    }catch(error){
        console.log(`connection error ${error}`)
    }
}