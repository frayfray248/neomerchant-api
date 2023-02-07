// imports
const mongoose = require('mongoose')
const { createError } = require('../../error/error')

// db connection
const db = mongoose.connection

// models
const ShoppingCart = require('../models/ShoppingCart.js')
const User = require('../models/Users')

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
            res.status(201).json({ message: "Shopping cart created" })

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

            console.log(shoppingCart._id, shoppingCartId)

            // checking ownership of the shopping cart
            if (!shoppingCart._id.equals(shoppingCartId)) throw createError(400, "Not authorized")
            
            // response
            res.status(200).json(shoppingCart)

        } catch (e) {
            next(e)
        }
    })()
}