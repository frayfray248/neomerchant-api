const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    orders: Object
})

module.exports = mongoose.model('User', UserSchema)