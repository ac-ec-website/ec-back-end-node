const orderService = require('../../services/orderService')
const cartService = require('../../services/cartService')
const couponService = require('../../services/couponService')
const discountService = require('../../services/discountService')
const emailNotify = require('../emailNotify')

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
      if (!orderCustomerName || !orderCustomerEmail || !orderCustomerPhone || !orderCustomerAddress) {
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

      const totalAmount =
        cart.items.length > 0 ? cart.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b) : 0

      const shippingMethod = await cart.shipping_method
      const shippingFee = await cart.shipping_fee

      // ===== Step 3 取得優惠券相關資訊 =====
      const couponCode = req.session.couponCode
      let couponDiscountFee = 0
      let CouponId

      if (couponCode !== undefined) {
        const couponData = await couponService.getCoupon(couponCode)

        CouponId = couponData.id
        couponDiscountFee = await couponService.getCouponDiscountFee(couponData, shippingFee, totalAmount)
      }

      // ===== Step 4 取得優惠活動資訊 =====
      const discountData = await discountService.getDiscounts(cart, totalAmount)

      const discountId = discountData.id
      if (discountId) {
        couponDiscountFee = await discountService.getDiscountFee(discountData, shippingFee, totalAmount)
      }

      // ===== Step 5 取得結帳金額資訊 =====
      const checkoutPrice = totalAmount + shippingFee - couponDiscountFee

      // ===== Step 6 創建訂單 =====
      const { orderData, orderItemData, paymentData, shippingData, tempOrderId } = await orderService.postOrder(
        checkoutPrice,
        shippingFee,
        couponDiscountFee,
        totalAmount,
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
        tempCartId,
        discountId
      )

      // ===== Step 7 設定 req.session.cartId 為 undefined，避免購物車重複使用，同時，不影響 productController getProducts =====
      req.session.cartId = undefined

      // ===== Step 8 將 tempOrderId, paymentData.id 存入 res.session =====
      req.session.orderId = tempOrderId
      req.session.paymentId = paymentData.id
      req.session.discountId = discountId
      await req.session.save()

      res.json({
        orderData,
        orderItemData,
        paymentData,
        shippingData,
        status: 'success',
        message: '成功新增一筆訂單'
      })

      // 訂單成立 Email
      const buyerEmail = orderCustomerEmail
      const emailSubject = '[GPW 電商網站系統信]：您的訂單已成立！'
      const emailContent = `<h4>${orderCustomerName} 你好</h4>
      <p>您的訂單已成立，本次訂單金額為 $ ${checkoutPrice} 元，若有任何問題，歡迎隨時與我們聯繫，感謝！</p>`

      emailNotify.sendEmail(buyerEmail, emailSubject, emailContent)
    } catch (error) {
      console.log('訂單創建 error', error)
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

      if (order.payment_status === '1') {
        // 訂單付款成功 Email
        const buyerEmail = order.email
        const emailSubject = `[GPW 電商網站系統信]：您的訂單 #${order.id} 已成功付款！`
        const emailContent = `<h4>${order.name} 你好</h4>
      <p>您的訂單已成功付款，本次訂單金額為 $ ${order.checkoutPrice} 元，若有任何問題，歡迎隨時與我們聯繫，感謝！</p>`

        emailNotify.sendEmail(buyerEmail, emailSubject, emailContent)
      }

      return res.json({
        order,
        payment,
        shipping,
        status: 'success',
        message: '成功取得單一訂單的資料'
      })
    } catch (error) {
      console.log('取得訂單 error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = orderController
