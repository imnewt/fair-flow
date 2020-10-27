var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    displayName: {
        default: "",
        type: String
    },
    phone: {
        default: "",
        type: String
    }
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;