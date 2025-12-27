import express from "express"
const router = express.Router();

router.get("/send", (req, res) => {
    res.status(201).send("<h1>message send here</h1>")
});

export default router;