// imports
const mongoose = require('mongoose')
const { createError } = require('../../error/error')

// db connection
const db = mongoose.connection

// models
const ShoppingCart = require('../models/ShoppingCart.js')
const User = require('../models/Users')
const Product = require('../models/Product.js')

// create a shopping cart
exports.createShoppingCart = (req, res, next) => {
    (async () => {
        try {

            // get user id from decoded json token
            const userId = req.userData.id

            // getting user
            const user = await User.findById(userId)

            if (user.shoppingCart) throw createError(400, "User already has shopping cart")

            // create new shopping cart for user
            const newShoppingCart = await ShoppingCart.create({
                user: userId,
                products: []
            })

            // assigning user with shopping cart
            user.shoppingCart = newShoppingCart._id

            // save new shopping cart
            await newShoppingCart.save()
            await user.save()

            // response
            res.status(201).json(newShoppingCart)

        } catch (e) {
            next(e)
        }
    })()
}

exports.getShoppingCartById = (req, res, next) => {
    (async () => {
        try {

            // get user id from decoded json token
            const userId = req.userData.id
            const shoppingCartId = mongoose.Types.ObjectId(req.params.id)

            // get user
            const user = await User.findById(userId)

            // no shopping cart found on user decoded json token
            if (!user.shoppingCart) throw createError(404, "No shopping cart found")

            // get shopping cart by req param id
            const shoppingCart = await ShoppingCart.findById(shoppingCartId)

            // no shopping cart found
            if (!shoppingCart) throw createError(404, "No shopping cart found")

            // checking ownership of the shopping cart
            if (!shoppingCart._id.equals(shoppingCartId)) throw createError(401, "Not authorized")
            
            // response
            res.status(200).json(shoppingCart)

        } catch (e) {
            next(e)
        }
    })()
}

exports.updateShoppingCart = (req, res, next) => {
    (async () => {
        try {

            // get user id from decoded json token
            const userId = req.userData.id
            const shoppingCartId = mongoose.Types.ObjectId(req.params.id)
            const newShoppingCart = req.body

            if (!newShoppingCart.products) throw createError(400, "Request does not contain any products")

            // get user
            const user = await User.findById(userId)

            // no shopping cart found on user decoded json token
            if (!user.shoppingCart) throw createError(404, "No shopping cart found")

            // get shopping cart by req param id
            const shoppingCart = await ShoppingCart.findById(shoppingCartId)

            // no shopping cart found
            if (!shoppingCart) throw createError(404, "No shopping cart found")

            // checking ownership of the shopping cart
            if (!shoppingCart._id.equals(shoppingCartId)) throw createError(401, "Not authorized")

            // clear old shopping cart products
            shoppingCart.products = []

            // update shopping cart
            for (const newProduct of newShoppingCart.products) {
                shoppingCart.products.push({
                    _id: newProduct._id,
                    quantity: newProduct.quantity
                })
            }

            // save
            await shoppingCart.save()
            
            // response
            res.status(200).json(shoppingCart)

        } catch (e) {

            
            if (e.message === "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer") {
                next(createError("400", "Bad product Ids in request body"))
            }

            next(e)
        }
    })()
}