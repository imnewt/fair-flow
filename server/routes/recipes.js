const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://imnewt:Trucdeptrai99@cluster0.agf7p.mongodb.net/homemade-drink?retryWrites=true&w=majority"
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const Recipe = require("../models/recipe");

router.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
})

module.exports = router;