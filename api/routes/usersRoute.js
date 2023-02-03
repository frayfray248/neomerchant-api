// imports
const express = require('express')

// middleware
const auth = require('../middleware/auth')

// controller
const UsersController = require('../controllers/UsersController')

// router
const router = express.Router()

// routes
router.post('/', UsersController.createUser)
router.delete('/', auth, UsersController.deleteUser)
router.post('/login', UsersController.login)


// export
module.exports = router