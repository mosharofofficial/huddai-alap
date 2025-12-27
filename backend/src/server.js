import express from "express";
import dotenv from "dotenv";
import path from "path";
import Route from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";


dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3215;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", Route);
app.use("/api/message", messageRoute);

// jokhon amar app ready hobe deployment er jonno
if(process.env.NODE_ENV === "production")
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