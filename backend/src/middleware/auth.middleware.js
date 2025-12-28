import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token)
            return res.status(401).json({message: "Unauthorize - no token provide"});

        const decode = jwt.verify(token, ENV.JWT_SECRET);
        if(!decode)
            return res.status(401).json({message: "Unauthorize - invalid token provide"});

        const user = await User.findById(decode.userId).select("-password");
        if(!user)
            return res.status(404).json({message: "User not found"});

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        if(error.name === "JsonWebTokenError") {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({message: "Unauthorized - Token expired"});
        }
        
        res.status(500).json({message: "Internal Server Error"});
    }
};