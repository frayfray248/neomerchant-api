// imports
const mongoose = require('mongoose')
const { createError } = require('../../error/error')

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
            if (!product) throw createError(404, "No product found")

            // send product
            await res.status(200).json(product)
 
        } catch(e) {

            // send bad request response if Object ID could not be casted
            if (e instanceof mongoose.Error.CastError) next(createError(400, "Invalid product id", e.message))

            // all other errors
            next(e)
        }
    })()
}