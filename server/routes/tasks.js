const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://imnewt:Trucdeptrai99@cluster0.agf7p.mongodb.net/fair-flow?retryWrites=true&w=majority"
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = require("../models/task");

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
})

// UPDATE PROGRESS
// router.post('/users/updateProgress', async (req, res) => {
//     const { user, newPassword } = req.body;
//     await User.findOneAndUpdate(
//         { _id: user._id},
//         { $set: { password: newPassword }},
//         (err, user) => {
//             if (err) {
//                 res.send({
//                     success: false,
//                     message: "Error while updating password!"
//                 })
//             }
//             else {
//                 res.send({
//                     success: true,
//                     message: "Update success!"
//                 })
//             }
//         })
// })

module.exports = router;