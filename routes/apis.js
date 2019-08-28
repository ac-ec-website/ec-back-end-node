const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const { checkIsLogin, checkIsAdmin } = require('../config/authorization')

const adminController = require('../controllers/api/adminController')
const adminProduct = require('../controllers/api/adminProduct')
const adminCategory = require('../controllers/api/adminCategory')
const adminCoupon = require('../controllers/api/adminCoupon')
const adminDiscount = require('../controllers/api/adminDiscount')
const adminOrder = require('../controllers/api/adminOrder')

const productController = require('../controllers/api/productController.js')
const cartController = require('../controllers/api/cartController.js')
const orderController = require('../controllers/api/orderController.js')
const userController = require('../controllers/api/userController')
const paymentController = require('../controllers/api/paymentController')

// === 商品顯示 API === //
// 取得所有商品資料
router.get('/products', productController.getProducts)
// 取得單一商品資料
router.get('/products/:id', productController.getProduct)

// === 購物車 API === //
// 加入購物車
router.post('/cart', cartController.postCart)
// 取得單一購物車的資料
router.get('/cart', cartController.getCart)
// 增加購物車內商品數量
router.post('/cart/:cartId/cartItem/:id/add', cartController.addItemToCart)
// 減少購物車內商品數量
router.post('/cart/:cartId/cartItem/:id/sub', cartController.subItemFromCart)
// 刪除購物車內的商品
router.delete('/cart/:cartId/cartItem/:id', cartController.deleteItemFromCart)

// === 訂單 API === //
// 新增一筆訂單
router.post('/order', upload.none(), orderController.postOrder)
// 取得一筆訂單
router.get('/order', orderController.getOrder)

// === 款項 API === //
router.get('/payment', paymentController.getPayment)
router.post('/spgateway/callback', paymentController.spgatewayCallback)

// === 管理員功能 API === //
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

router.get('/admin/categories', adminCategory.getCategories)
router.get('/admin/categories/:id', adminCategory.getCategory)
router.post('/admin/categories', adminCategory.postCategory)
router.put('/admin/categories/:id', adminCategory.putCategory)
router.delete('/admin/categories/:id', adminCategory.deleteCategory)

router.get('/admin/coupons', adminCoupon.getCoupons)
router.get('/admin/coupons/:id', adminCoupon.getCoupon)
router.post('/admin/coupons', upload.none(), adminCoupon.postCoupon)
router.put('/admin/coupons/:id', upload.none(), adminCoupon.putCoupon)
router.delete('/admin/coupons/:id', adminCoupon.deleteCoupon)

router.get('/admin/discounts', adminDiscount.getDiscounts)
router.get('/admin/discounts/:id', adminDiscount.getDiscount)
router.post('/admin/discounts', upload.none(), adminDiscount.postDiscount)
router.put('/admin/discounts/:id', upload.none(), adminDiscount.putDiscount)
router.delete('/admin/discounts/:id', adminDiscount.deleteDiscount)

router.get('/admin/orders', adminOrder.getOrders)
router.get('/admin/orders/:id', adminOrder.getOrder)
router.put('/admin/orders/:id', adminOrder.putOrder)

router.get('/admin/users', adminController.getUsers)
router.put('/admin/user', adminController.putUser)

module.exports = router
