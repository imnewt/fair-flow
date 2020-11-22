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

module.exports = router;