var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    beverageName: String,
    creator: String,
    country: String,
    time: String,
    difficulty: String
});

var Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

module.exports = Recipe;