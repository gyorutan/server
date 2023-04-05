const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    loginId: {
        type: String,
        required: true,
        unique: true,
    },
    loginPw: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;