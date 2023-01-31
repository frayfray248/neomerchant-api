// imports
const express = require('express')

// controller
const ProductController = require('../controllers/ProductsController')

// router
const router = express.Router()

// routes
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)

// export
module.exports = router