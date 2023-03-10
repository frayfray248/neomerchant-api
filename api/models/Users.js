const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 18,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    shoppingCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShoppingCart"
    },
    role: String,
    orders: Object
})

module.exports = mongoose.model('User', UserSchema)