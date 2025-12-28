import express from 'express'
import { signUp } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup", signUp);

router.get("/login", (req, res) => {
    res.send('login route here');
});

router.get("/logout", (req, res) => {
    res.send('logout route here');
});

router.get("/update", (req, res) => {
    res.send('logout route here');
});

export default router;