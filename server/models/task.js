var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    roomId: String,
    roomName: String,
    name: String,
    description: String,
    progress: {
        default: 0,
        type: Number
    },
    deadline: String
});

var Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;