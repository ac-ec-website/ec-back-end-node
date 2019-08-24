const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const { checkIsLogin, checkIsAdmin } = require('../config/authorization')

const adminProduct = require('../controllers/api/adminProduct')
const adminOrder = require('../controllers/api/adminOrder')

const productController = require('../controllers/api/productController.js')
const cartController = require('../controllers/api/cartController.js')
const adminController = require('../controllers/api/adminController')
const userController = require('../controllers/api/userController')

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
router.post('/cart', cartController.postCart)

// === 購物車 API === //
// 取得單一購物車的資料
router.get('/cart/:id', cartController.getCart)
// 增加購物車內商品數量
router.post('/cart/:cartId/cartItem/:id/add', cartController.addItemToCart)
// 減少購物車內商品數量
router.post('/cart/:cartId/cartItem/:id/sub', cartController.subItemFromCart)
// 刪除購物車內的商品
router.delete('/cart/:cartId/cartItem/:id', cartController.deleteItemFromCart)

router.post('/admin/signup', adminController.signUp)
router.post('/admin/signin', adminController.signIn)

// router.use(checkIsLogin)
// router.use(checkIsAdmin)
router.get('/get_current_user', userController.getCurrentUser)

router.get('/admin/products', adminProduct.getProducts)
router.get('/admin/products/:id', adminProduct.getProduct)
router.post('/admin/products', upload.single('image'), adminProduct.postProduct)
router.put('/admin/products/:id', upload.single('image'), adminProduct.putProduct)
router.delete('/admin/products/:id', adminProduct.deleteProduct)

router.get('/admin/orders', adminOrder.getOrders)
router.get('/admin/orders/:id', adminOrder.getOrder)
router.put('/admin/orders/:id', adminOrder.putOrder)

module.exports = router
