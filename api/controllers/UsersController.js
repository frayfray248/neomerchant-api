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

            // validate user
            if (!user.username) throw createError(400, "username required")
            if (!user.password) throw createError(400, "password required")

            // create new user
            const newUser = await User.create({
                username: user.username,
                password: await bcrypt.hash(user.password, 10)
            })
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
                username : user.username,
                _id: user._id
            }

            // create json token
            const token = await jwt.sign(
                jwtPayLoad,
                process.env.JWT_KEY,
                { expiresIn: "1h"}
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