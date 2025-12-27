import User from "../models/User.js";

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
        const user = await User.findOne(email);
        if(user)
            return res.status(400).json({message:"you are already created account now you can login"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
