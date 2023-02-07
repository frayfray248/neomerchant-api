// imports
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

            // check if username and password was provided
            if (!user.username) throw createError(400, "username required")
            if (!user.password) throw createError(400, "password required")

            // password length check
            if (user.password.length < 6) throw createError(400, "password must be at least 6 characters long")

            // create new user
            const newUser = await User.create({
                username: user.username,
                password: await bcrypt.hash(user.password, 10)
            })

            // save
            await newUser.save()

            // response
            res.status(201).json({ message: "User created" })

        } catch (e) {

            // duplicate username error
            if (e instanceof mongoose.mongo.MongoServerError && e.code === 11000) {
                next(createError(400, "username taken"))
            }

            // validation error
            if (e.name === "ValidationError") {
                next(createError(400, "invalid user data"))
            }

            next(e)
        }
    })()
}

// delete a user
exports.deleteUser = (req, res, next) => {
    (async () => {
        try {
            // find user
            const user = await User.findOne({
                _id: req.userData._id
            })

            // no user found error
            if (!user) throw createError(404, "user not found")

            // delete user
            await User.deleteOne({
                _id: req.userData._id
            })


            // response
            res.status(200).json({ message: "user deleted" })

        } catch (e) {

            next(e)

        }
    })()
}

// login a user
exports.login = (req, res, next) => {
    (async () => {
        try {

            // validate user
            if (!req.body.username) throw createError(400, "username required")
            if (!req.body.password) throw createError(400, "password required")

            // find user
            const user = await User.findOne({
                username: req.body.username
            })

            // fail auth if no user was found
            if (!user) throw createError(401, "authorization failed")

            // password check
            const auth = await bcrypt.compare(req.body.password, user.password)

            // fail if passwords do not match
            if (!auth) throw createError(401, "authorization failed")

            // create json token payload
            const jwtPayLoad = {
                username: user.username,
                id: user._id
            }

            if (user.shoppingCart) {
                jwtPayLoad.shoppingCartId = user.shoppingCart
            }

            // create json token
            const token = await jwt.sign(
                jwtPayLoad,
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            )

            // send token
            res.status(200).send({
                token: token
            })


        } catch (e) {


            next(e)
        }
    })()
}