const express = require('express')
const router = express.Router()

const productController = require('../controllers/api/productController.js')
const cartController = require('../controllers/api/cartController.js')

router.get('/products', productController.getProducts)
router.get('/cart/:id', cartController.getCart)

module.exports = router
