import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const signUp = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password)
        {
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 8)
        {
            return res.status(400).json({message:"Password must be at least 8 characters"});
        }
        
        // email verify
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).json({message:"Please enter a valid email address"});
        }
        const user = await User.findOne({ email }); 
        if(user)
            return res.status(400).json({message:"you are already created account now you can login"});
        // amra password hasing er jonno bcrypt.js use korbo
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        });

        if(newUser)
        {
            // generateToken(newUser._id, res)
            // await newUser.save();
            const saveUser = await newUser.save();
            generateToken(saveUser._id, res)

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
            // resender email veryfaction
            try {
                await sendWelcomeEmail(saveUser.email, saveUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.log("Error to send Welcome Email", error);
            }
        }
        else
        {
            res.status(400).json({message: "invalid User information"})
        }
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({message: "internal serval error"});
    }
}
