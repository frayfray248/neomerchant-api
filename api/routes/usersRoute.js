// imports
const express = require('express')

// controller
const UsersController = require('../controllers/UsersController')

// router
const router = express.Router()

// routes
router.post('/', UsersController.createUser)

// export
module.exports = router