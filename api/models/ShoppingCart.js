const mongoose = require('mongoose')

const ShoppingCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema)