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
                user : userId,
                products: []
            })

            // assigning user with shopping cart
            user.shoppingCart = newShoppingCart._id

            // save new shopping cart
            await newShoppingCart.save()
            await user.save()

            // response
            res.status(201).json({ message: "Shopping cart created" })
           
        } catch(e) {
            next(e)
        }
    })()
}
