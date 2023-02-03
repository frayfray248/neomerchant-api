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

           res.status(200).json({ message : "Create User"})
 
        } catch(e) {
            next(e)
        }
    })()
}