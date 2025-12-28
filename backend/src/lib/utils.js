import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ✅ Changed 100 to 1000 (milliseconds)
        httpOnly: true, // cross site scripting Prevents XSS attacks
        sameSite: "strict", // ✅ Changed sameSit to sameSite (prevents CSRF)
        secure: process.env.NODE_ENV === "development" ? false : true, 
    });
    return token;
};

