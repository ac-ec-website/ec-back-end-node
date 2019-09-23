const db = require('../../models')
const faker = require('faker')
const snNum = faker.random.number() // 新增訂單使用
const Product = db.Product
const Cart = db.Cart
const CartItem = db.CartItem
const Order = db.Order
const OrderItem = db.OrderItem
const Payment = db.Payment
const Shipping = db.Shipping
const Coupon = db.Coupon

const orderService = require('../../services/orderService')
const cartService = require('../../services/cartService')
const couponService = require('../../services/couponService')

const orderController = {
  postOrder: async (req, res) => {
    try {
      const orderCustomerName = req.body.orderCustomerName
      const orderCustomerEmail = req.body.orderCustomerEmail
      const orderCustomerPhone = req.body.orderCustomerPhone
      const orderCustomerAddress = req.body.orderCustomerAddress
      const orderRecipientName = req.body.orderRecipientName
      const orderRecipientPhone = req.body.orderRecipientPhone
      const orderRecipientAddress = req.body.orderRecipientAddress
      const orderRemark = req.body.orderRemark

      // ===== Step 1 檢查客戶資料是否填寫完整 =====
      if (
        !orderCustomerName ||
        !orderCustomerEmail ||
        !orderCustomerPhone ||
        !orderCustomerAddress
      ) {
        return res.json({
          status: 'error',
          message: '請填寫訂單客戶資料欄位'
        })
      }

      if (!orderRecipientName || !orderRecipientPhone || !orderRecipientAddress) {
        return res.json({
          status: 'error',
          message: '請填寫訂單配送資料欄位'
        })
      }

      // ===== Step 2 取得該購物車相關資訊 =====
      const tempCartId = req.session.cartId

      if (!tempCartId) {
        return res.json({
          status: 'error',
          message: '目前無 cartId 資料'
        })
      }

      const cart = await cartService.getCart(tempCartId)

      const total_amount =
        cart.items.length > 0
          ? cart.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b)
          : 0

      let shippingMethod = await cart.shipping_method
      let shipping_fee = await cart.shipping_fee

      // ===== Step 3 取得優惠券相關資訊 =====
      const couponCode = req.session.couponCode
      let coupon_discount_fee = 0
      let CouponId

      if (couponCode !== undefined) {
        let couponData = await couponService.getCoupon(couponCode)

        CouponId = couponData.id
        coupon_discount_fee = await couponService.getCouponDiscountFee(couponData)
      }

      // ===== Step 4 取得結帳金額資訊 =====
      const checkoutPrice = total_amount + shipping_fee - coupon_discount_fee

      // ===== Step 5 創建訂單 =====
      const {
        orderData,
        orderItemData,
        paymentData,
        shippingData,
        tempOrderId
      } = await orderService.postOrder(
        checkoutPrice,
        shipping_fee,
        coupon_discount_fee,
        total_amount,
        orderCustomerName,
        orderCustomerEmail,
        orderCustomerPhone,
        orderCustomerAddress,
        orderRemark,
        CouponId,
        orderRecipientName,
        orderRecipientPhone,
        orderRecipientAddress,
        shippingMethod,
        cart,
        tempCartId
      )

      // ===== Step 6 設定 req.session.cartId 為 undefined，避免購物車重複使用，同時，不影響 productController getProducts =====
      req.session.cartId = undefined

      // ===== Step 7 將 tempOrderId, paymentData.id 存入 res.session =====
      req.session.orderId = tempOrderId
      req.session.paymentId = paymentData.id
      await req.session.save()

      res.json({
        orderData,
        orderItemData,
        paymentData,
        shippingData,
        status: 'success',
        message: '成功新增一筆訂單'
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },
  // 取得單一訂單的資料
  getOrder: async (req, res) => {
    try {
      const orderId = req.session.orderId

      if (!orderId) {
        return res.json({
          status: 'error',
          message: '目前無 orderId 資料'
        })
      }

      const { order, payment, shipping } = await orderService.getOrder(orderId)

      return res.json({
        order,
        payment,
        shipping,
        status: 'success',
        message: '成功取得單一訂單的資料'
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = orderController
