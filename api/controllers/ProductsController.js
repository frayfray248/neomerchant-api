// imports
const mongoose = require('mongoose')

// db connection
const db = mongoose.connection

// models
const Product = require('../models/Product.js')

// get all products
exports.getProducts = (req, res, next) => {
    (async () => {
        try {

            // get products
            const products = await Product.find()

            // send products
            await res.status(200).json(products)
 
        } catch(e) {
            next(e)
        }
    })()
}