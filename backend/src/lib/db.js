import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB is connected successfully ${conect.connection.host}`);
    } catch (error) {
        console.log(`MongoDb is not connected ${error}`);
        process.exit(1);
    }
}