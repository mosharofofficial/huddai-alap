import Message from '../models/Message.js';
import User from '../models/User.js';
import cloudinary from '../lib/cloudinary.js';

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({message: "server error"});
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: id },
                { senderId: id, receiverId: myId },
            ]
        }).sort({ createdAt: 1 });  // Sort oldest to newest

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in getMessage controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        if(!text && !image) {
            return res.status(400).json({message: "Text or image is required"});
        }

        // Prevent self-messaging
        if(senderId.equals(receiverId)) {
            return res.status(400).json({message: "Cannot send message to yourself"});
        }

        // Check if receiver exists
        const receiverExists = await User.exists({_id: receiverId});
        if(!receiverExists) {
            return res.status(404).json({message: "Receiver not found"});
        }

        let imageUrl;
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: send messages in real-time if user is availble online using socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find all messages where the logged-in user is either sender or receiver
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId }, 
                { receiverId: loggedInUserId }
            ]
        });

        // Extract unique chat partner IDs
        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString() 
                        ? msg.receiverId.toString() 
                        : msg.senderId.toString()
                )
            )
        ];

        // Get chat partners' details
        const chatPartners = await User.find({
            _id: { $in: chatPartnerIds }
        }).select("-password");

        res.status(200).json(chatPartners);
        
    } catch (error) {
        console.log("Error in getChatPartners controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};