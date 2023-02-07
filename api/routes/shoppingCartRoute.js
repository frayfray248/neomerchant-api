// imports
const express = require('express')

// middleware
const auth = require('../middleware/auth')

// controller
const ShoppingCartController = require('../controllers/ShoppingCartController')

// router
const router = express.Router()

// routes
router.post('/', auth, ShoppingCartController.createShoppingCart)
router.get('/:id', auth, ShoppingCartController.getShoppingCartById)
// router.patch('/:id', auth, ShoppingCartController.updateShoppingCart)


// export
module.exports = router