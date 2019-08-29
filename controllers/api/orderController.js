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

const orderController = {
  postOrder: async (req, res) => {
    // ===== Step 1 檢查客戶資料是否填寫完整 =====
    if (
      !req.body.orderCustomerName ||
      !req.body.orderCustomerEmail ||
      !req.body.orderCustomerPhone ||
      !req.body.orderCustomerAddress
    ) {
      return res.json({ status: 'error', message: '請填寫訂單客戶資料欄位' })
    }

    if (
      !req.body.orderRecipientName ||
      !req.body.orderRecipientPhone ||
      !req.body.orderRecipientAddress
    ) {
      return res.json({ status: 'error', message: '請填寫訂單配送資料欄位' })
    }

    // ===== Step 2 取得該購物車資料 & 商品總價 =====

    // ===== Step 2-1 取得目前購物車 cartId =====
    const tempCartId = req.session.cartId // ::TODO:: 如何讓測試可執行
    console.log('=== （Ｏ）目前購物車 cartId ===')
    console.log(tempCartId)
    console.log('=== （Ｏ）目前購物車 cartId ===')

    // ===== Step 2-2 取得目前購物車內的 cartData 資料 =====
    const cartData = await Cart.findOne({
      where: {
        id: tempCartId
      },
      include: [{ model: Product, as: 'items' }]
    })

    // ===== Step 2-3 取得使用者選擇的配送方式 =====
    let shippingMethod = await cartData.shipping_method

    console.log('=== （Ｏ）配送方式 shippingMethod ===')
    console.log(shippingMethod)
    console.log('=== （Ｏ）配送方式 shippingMethod ===')

    // ===== Step 2-4 取得該購物車商品總價 =====
    let total_amount =
      cartData.items.length > 0
        ? cartData.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b)
        : 0

    console.log('=== （Ｏ）商品總價 total_amount ===')
    console.log(total_amount)
    console.log('=== （Ｏ）商品總價 total_amount ===')

    // ===== Step 3 創建訂單 =====
    const orderData = await Order.create({
      sn: snNum,
      total_amount: total_amount,
      name: req.body.orderCustomerName,
      email: req.body.orderCustomerEmail,
      phone: req.body.orderCustomerPhone,
      address: req.body.orderCustomerAddress,
      order_status: 1, // (0 - 已取消, 1 - 處理中）
      remark: null,
      shipping_status: 0, //（0 - 尚未配送, 1 - 配送中, 2 - 已送達）
      payment_status: 0, //（0 - 尚未付款, 1 - 已付款）
      UserId: null,
      CouponId: null,
      discountId: null
    })

    console.log('=== （Ｏ）訂單資料 orderData ===')
    console.log(orderData)
    console.log('=== （Ｏ）訂單資料 orderData ===')

    // ===== Step 4 建立與訂單有關的 OrderItem =====

    // ===== Step 4-1 取得與該購物車有關的商品資料 =====
    const cartItemData = await CartItem.findAll({
      where: {
        CartId: tempCartId // 以 req 而來的 tempCartId 作為搜尋條件
      }
    })

    // ===== Step 4-2 逐一建立與該訂單有關的 OrderItem =====
    const tempOrderId = await orderData.id // 取得 orderId 使用

    const orderItem = await cartData.items.map(async d => {
      const data = await OrderItem.create({
        price: d.sell_price,
        quantity: await getQyt(d),
        OrderId: tempOrderId,
        ProductId: d.id
      })
    })

    // 取出購物車內商品的數量
    function getQyt(d) {
      let qyt = null
      cartItemData.forEach(item => {
        // 若該購物車內商品的 id 等於目前的產品 id，則回傳其數量使用
        if (item.dataValues.ProductId == d.id) {
          console.log('回傳的商品數量', item.dataValues.quantity)
          return (qyt = item.dataValues.quantity)
        }
      })
      return qyt
    }

    // ===== Step 5 建立與訂單有關的 Payment =====
    const paymentData = await Payment.create({
      params: null,
      sn: null,
      total_amount: total_amount,
      payment_method: null,
      payment_status: 0, //（0 - 尚未付款, 1 - 已付款）
      OrderId: tempOrderId
    })

    console.log('=== (Ｏ）訂單的付款資料 paymentData ===')
    console.log(paymentData)
    console.log('=== (Ｏ）訂單的付款資料 paymentData ===')

    // ===== Step 6 建立與訂單有關的 Shipping =====
    const shippingData = await Shipping.create({
      sn: null,
      shipping_fee: 60,
      shipping_method: shippingMethod,
      shipping_status: 0, //（0 - 尚未配送, 1 - 配送中, 2 - 已送達）
      name: req.body.orderRecipientName, // 從 前端 取得
      phone: req.body.orderRecipientPhone, // 從 前端 取得
      address: req.body.orderRecipientAddress, // 從 前端 取得
      OrderId: tempOrderId
    })

    console.log('=== (Ｏ）訂單的付款資料 shippingData ===')
    console.log(shippingData)
    console.log('=== (Ｏ）訂單的付款資料 shippingData ===')

    // ===== Step 7 取得該訂單的商品資訊 =====
    const orderItemData = await Order.findOne({
      where: { id: tempOrderId }, // ::TODO:: 如何讓測試可執行
      include: [{ model: Product, as: 'items' }]
    })

    console.log('=== (Ｏ）取得該訂單的商品資訊 ===')
    console.log(orderItemData)
    console.log('=== (Ｏ）取得該訂單的商品資訊 ===')

    // ===== Step 8 將 tempCartId & tempOrderId 存入 res.session =====
    req.session.cartId = tempCartId
    req.session.orderId = tempOrderId
    req.session.save()

    console.log('=== (Ｏ）回傳 session 內容 ===')
    console.log('req.session', req.session)
    console.log('=== (Ｏ）回傳 session 內容 ===')

    res.json({
      orderData,
      orderItemData,
      paymentData,
      shippingData,
      status: 'success',
      message: '成功新增一筆訂單'
    })
  },
  // 取得單一訂單的資料
  getOrder: async (req, res) => {
    console.log('=== (Ｏ）取得目前 session 內容 ===')
    console.log('req.session', req.session)
    console.log('=== (Ｏ）取得目前 session 內容 ===')

    const order = await Order.findOne({
      where: { id: req.session.orderId }, // ::TODO::如何讓測試可執行
      include: [{ model: Product, as: 'items' }]
    })

    res.json({
      order,
      status: 'success',
      message: '成功取得單一訂單的資料'
    })
  }
}

module.exports = orderController
