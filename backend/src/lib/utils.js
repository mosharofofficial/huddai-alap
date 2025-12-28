import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET) 
        throw new Error("your JWT_SECRET not define");
    
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ✅ Changed 100 to 1000 (milliseconds)
        httpOnly: true, // cross site scripting Prevents XSS attacks
        sameSite: "strict", // ✅ Changed sameSit to sameSite (prevents CSRF)
        secure: ENV.NODE_ENV === "development" ? false : true, 
    });
    return token;
};

