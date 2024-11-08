import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected ! DB host: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MongoDB Connection error", error);
        // The process.exit(1) is used to forcefully terminate the Node.js process with an exit code of 1.
        process.exit(1)
    }
}

export default connectDB;
