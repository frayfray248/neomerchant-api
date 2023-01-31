// imports
const express = require('express')

// controller
const ProductController = require('../controllers/ProductsController')

// router
const router = express.Router()

// routes
router.get('/', ProductController.getProducts)

// export
module.exports = router