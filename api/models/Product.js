const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    title : String,
    description : String,
    price : Number,
    category : String
})

module.exports = mongoose.model('Product', ProductSchema)