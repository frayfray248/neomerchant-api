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

// get all products
exports.getProductById = (req, res, next) => {
    (async () => {
        try {

            // get product
            const product = await Product.findById(req.params.id)

            // no product found error
            if (!product) {
                const msg = "No product found"
                const error = new Error(msg)
                error.statusCode = 404
                error.statusMessage = msg
                throw error
            }

            // send product
            await res.status(200).json(product)
 
        } catch(e) {

            // send bad request response if Object ID could not be casted
            if (e instanceof mongoose.Error.CastError) {
                const msg = "Invalid product id"
                const error = new Error(msg)
                error.statusCode = 400
                error.statusMessage = msg
                next(error)
            }

            next(e)
        }
    })()
}