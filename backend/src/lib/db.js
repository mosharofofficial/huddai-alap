import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const {MONGO_URI} = ENV;
        if(!MONGO_URI) throw new Error("MONGO_URI not set");
        const conect = await mongoose.connect(ENV.MONGO_URI);
        console.log(`mongoDB is connected successfully ${conect.connection.host}`);
    } catch (error) {
        console.log(`MongoDb is not connected ${error}`);
        process.exit(1);
    }
}