const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    events: [{
        title: String,
        startTime: String,
        endTime: String
    }],
    friends: [{
        username: String,
        email: String,
        pending: {type: Boolean, default: false}
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
