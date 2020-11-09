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

// CREATE USER
router.post('/users/create', async (req, res) => {
    const { email, displayName, password } = req.body;
    await User.find({ email: email }, (err, previousUsers) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error while creating new user!"
            })
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                for: "email",
                message: "Email has been used for another account!"
            })
        }
        else {
            let newUser = new User();
            newUser.email = email;
            newUser.displayName = displayName;
            newUser.password = password;
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error while creating new user!"
                    })
                } 
                else {
                    return res.send({
                        success: true,
                        message: "User created!"
                    })
                }
            })
        }
    })
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