const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const adminProduct = require('../controllers/api/adminProduct')
const productController = require('../controllers/api/productController.js')

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)

router.get('/admin/products', adminProduct.getProducts)
router.get('/admin/products/:id', adminProduct.getProduct)
router.post('/admin/products', upload.single('image'), adminProduct.postProduct)
router.put('/admin/products/:id', upload.single('image'), adminProduct.putProduct)
router.delete('/admin/products/:id', adminProduct.deleteProduct)

module.exports = router
