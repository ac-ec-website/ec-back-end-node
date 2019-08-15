const express = require('express')
const router = express.Router()

const productController = require('../controllers/api/productController.js')
const cartController = require('../controllers/api/cartController.js')

router.get('/products', productController.getProducts)

// === 購物車 API === //
// 取得單一購物車的資料
router.get('/cart/:id', cartController.getCart)
// 增加購物車內商品數量
router.post('/cart/:cartId/cartItem/:id/add', cartController.addItemToCart)
// 減少購物車內商品數量
router.post('/cart/:cartId/cartItem/:id/sub', cartController.subItemFromCart)
// 刪除購物車內的商品
router.delete('/cart/:cartId/cartItem/:id', cartController.deleteItemFromCart)

module.exports = router
