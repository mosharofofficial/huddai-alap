import express from "express"
import dotenv from "dotenv"
import Route from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"


dotenv.config();
const app = express();
const port = process.env.PORT || 3215;

app.use("/api/auth", Route);
app.use("/api/message", messageRoute);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});