import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // amara token bangbo http er kache theke niye
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

        if (!token) {
        console.log("Socket connection failed: no token provide");
        return next(new Error("Unauthorized - no token provide"));
        }

        // verify token
        const decode = jwt.verify(token, ENV.JWT_SECRET);
        if(!decode){
            console.log("Socket connection failed: Invalid token");
            return next(new Error("Unauthorized - invalid token"));
        }

        // find user by her id where mongoDB
        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            console.log("Socket connection failed: User not found");
            return next(new Error("User not found"));
        }

        socket.userId = user._id.toString();  // For easy ID access
        socket.user = user;  

        console.log(`Socket Authenticated for user: ${user.fullName} (${user._id})`);

        next();

    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
};