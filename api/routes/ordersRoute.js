// imports
const express = require('express')

// middleware
const auth = require('../middleware/auth')

// controller
const OrderController = require('../controllers/OrdersController')

// router
const router = express.Router()

// routes
router.post('/', auth, OrderController.createOrder)


// export
module.exports = router