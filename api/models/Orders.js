const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number
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

module.exports = mongoose.model('Order', OrderSchema)