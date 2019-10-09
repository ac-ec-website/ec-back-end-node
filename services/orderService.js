const db = require('../models')
const faker = require('faker')
const snNum = faker.random.number() // 新增訂單使用
const Product = db.Product
const CartItem = db.CartItem
const Order = db.Order
const OrderItem = db.OrderItem
const Payment = db.Payment
const Shipping = db.Shipping

const orderService = {
  postOrder: async (
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
  ) => {
    // ===== Step 1 創建訂單 =====
    const orderData = await Order.create({
      sn: snNum,
      checkoutPrice: checkoutPrice,
      shipping_fee: shipping_fee,
      discount_fee: coupon_discount_fee,
      total_amount: total_amount,
      name: orderCustomerName,
      email: orderCustomerEmail,
      phone: orderCustomerPhone,
      address: orderCustomerAddress,
      order_status: 1, // (0 - 已取消, 1 - 處理中）
      remark: orderRemark,
      shipping_status: 0, // （0 - 尚未配送, 1 - 配送中, 2 - 已送達）
      payment_status: 0, // （0 - 尚未付款, 1 - 已付款）
      UserId: null,
      CouponId: CouponId,
      DiscountId: null
    })

    // ===== Step 2 建立與訂單有關的 OrderItem =====

    const cartItemData = await CartItem.findAll({
      where: { CartId: tempCartId }
    })

    const tempOrderId = await orderData.id

    await cart.items.map(async d => {
      await OrderItem.create({
        price: d.sell_price,
        quantity: await getQyt(d),
        OrderId: tempOrderId,
        ProductId: d.id
      })
    })

    function getQyt (d) {
      let qyt = null
      cartItemData.forEach(item => {
        // 若該購物車內商品的 id 等於目前的產品 id，則回傳其數量使用
        if (item.dataValues.ProductId === d.id) {
          // console.log('回傳的商品數量', item.dataValues.quantity)
          return (qyt = item.dataValues.quantity)
        }
      })
      return qyt
    }

    // ===== Step 3 建立與訂單有關的 Payment =====
    const paymentData = await Payment.create({
      params: null,
      sn: null,
      total_amount: checkoutPrice, // 付款合計（商品＋運費-折價）
      payment_method: null,
      payment_status: 0, // （0 - 尚未付款, 1 - 已付款）
      OrderId: tempOrderId
    })

    // ===== Step 4 建立與訂單有關的 Shipping =====
    const shippingData = await Shipping.create({
      sn: null,
      shipping_fee: shipping_fee,
      shipping_method: shippingMethod,
      shipping_status: 0, // （0 - 尚未配送, 1 - 配送中, 2 - 已送達）
      name: orderRecipientName, // 從 前端 取得
      phone: orderRecipientPhone, // 從 前端 取得
      address: orderRecipientAddress, // 從 前端 取得
      OrderId: tempOrderId
    })

    // ===== Step 5 取得該訂單的商品資訊 =====
    const orderItemData = await Order.findAll({
      where: { id: tempOrderId },
      include: [{ model: Product, as: 'items' }]
    })

    return { orderData, orderItemData, paymentData, shippingData, tempOrderId }
  },
  getOrder: async orderId => {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [{ model: Product, as: 'items' }]
    })

    const payment = await Payment.findOne({
      where: { OrderId: orderId }
    })

    const shipping = await Shipping.findOne({
      where: { OrderId: orderId }
    })

    return { order, payment, shipping }
  }
}

module.exports = orderService
