const express = require('express')
const router = express.Router()

const productController = require('../controllers/api/productController.js')
const cartController = require('../controllers/api/cartController')

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
router.post('/cart', cartController.postCart)

module.exports = router
