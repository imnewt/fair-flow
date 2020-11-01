const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://imnewt:Trucdeptrai99@cluster0.agf7p.mongodb.net/fair-flow?retryWrites=true&w=majority"
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require("../models/user");

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
})

// LOGIN
router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    await User.find({ email: email }, (err, user) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error while login"
            })
        }
        else {
            if (user[0].password === password) {
                return res.send({
                    success: true,
                    message: "Login Success!"
                })
            }
            else {
                return res.send({
                    success: false,
                    message: "Wrong password!"
                })
            }
        }
    })
})

module.exports = router;