import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import Route from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";



const __dirname = path.resolve();
const app = express();
const port = ENV.PORT || 3215;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use("/api/auth", Route);
app.use("/api/messages", messageRoute);

// jokhon amar app ready hobe deployment er jonno
if(ENV.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.status(201).sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
    connectDB();
});