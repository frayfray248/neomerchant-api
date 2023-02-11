const mongoose = require('mongoose')

const ShoppingCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        }
        
    }]
})

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema)