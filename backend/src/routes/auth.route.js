import express from 'express'

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send('Signup route here');
});
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