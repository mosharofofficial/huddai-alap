import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from './env.js';
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
});

// middleware to socket connection
io.use(socketAuthMiddleware);

// eikhane check korbo user online ache naki nai
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
};

// eita user korar main reason holo amar jokhon dekhbo user ache naki online?
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("User is connected", socket.user.fullName);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    // emit use for send events to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // disconnect korar jonno and listen event from client
    socket.on("disconnect", () => {
        console.log("User is disconnected", socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io, app, server};