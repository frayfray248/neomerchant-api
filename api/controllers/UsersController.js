// imports
const mongoose = require('mongoose')
const { createError } = require('../../error/error')

// db connection
const db = mongoose.connection

// models
const User = require('../models/Users')

// create a user
exports.createUser = (req, res, next) => {
    (async () => {
        try {

            // get user
            const user = req.body

            // validate user
            if (!user.username) throw createError(400, "username required")
            if (!user.password) throw createError(400, "password required")

            // create new user
            const newUser = await User.create(user)
            await newUser.save()

            // response
            res.status(201).json({ message: "User created" })

        } catch (e) {

            // duplicate username error
            if (e instanceof mongoose.mongo.MongoServerError && e.code === 11000) {
                next(createError(400, "username taken"))
            }

            next(e)
        }
    })()
}