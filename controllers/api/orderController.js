const db = require('../../models')
const faker = require('faker')
const Order = db.Order
const OrderItem = db.OrderItem
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const orderController = {
  postOrder: async (req, res) => {
    // ===== Step 1. 檢查客戶資料是否填寫完整 =====
    // if (
    //   !req.body.orderCustomerName ||
    //   !req.body.orderCustomerEmail ||
    //   !req.body.orderCustomerPhone ||
    //   !req.body.orderCustomerAddress
    // ) {
    //   return res.json({ status: 'error', message: '請填寫訂單客戶資料欄位' })
    // }

    // if (
    //   !req.body.orderRecipientName ||
    //   !req.body.orderRecipientPhone ||
    //   !req.body.orderRecipientAddress
    // ) {
    //   return res.json({ status: 'error', message: '請填寫訂單配送資料欄位' })
    // }

    console.log('=== （0）送出訂單的預設 cartId ===')
    console.log('req.session', req.session)
    console.log('=== 0）送出訂單的預設 cartId ===')

    // ::TODO::（待修正） 暫時補 1，讓本機實作和測試可執行
    const cartId = req.session.cartId
    console.log('=== （1）目前購物車的 cartId ===')
    console.log('cartId', cartId)
    console.log('=== （1）目前購物車的 cartId ===')

    // ===== Step 2. 取得該購物車資料 & 商品總價 =====
    const cartData = await Cart.findOne({
      where: {
        id: cartId
      },
      include: [{ model: Product, as: 'items' }]
    })

    console.log('=== (2）目前購物車內的 cartData 資料 ===')
    console.log('cartData.items', cartData.items)
    console.log('=== (2）目前購物車內的 cartData 資料 ===')

    // ===== Step 3. 取得該購物車商品總價 =====
    let total_amount =
      cartData.items.length > 0
        ? cartData.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b)
        : 0

    console.log('=== (3）商品總價 total_amount 資料 ===')
    console.log('total_amount', total_amount)
    console.log('=== (3）商品總價 total_amount 資料 ===')

    const snNum = faker.lorem.text()

    // ===== Step 4. 創建訂單 =====
    const order = await Order.create({
      // ::TODO:: 暫時讓 sn = cartId
      sn: snNum,
      total_amount: total_amount,
      name: req.body.orderCustomerName,
      email: req.body.orderCustomerEmail,
      phone: req.body.orderCustomerPhone,
      address: req.body.orderCustomerAddress,
      shipping_status: false,
      payment_status: false,
      // ::TODO:: 等 User 建立後再行修改
      UserId: null,
      CouponId: null,
      discountId: null
    })

    console.log('order', order)

    const orderData = await Order.findOne({
      where: {
        sn: snNum
      }
    })

    console.log('=== (4）訂單資料 orderData 資料 ===')
    console.log('orderData', order.id)
    console.log('orderData', orderData.id)
    console.log('orderData', orderData)
    console.log('=== (4）訂單資料 orderData 資料 ===')

    // ===== Step 5. 取得與該購物車有關的商品資料 =====

    const cartItemData = await CartItem.findAll({
      where: {
        CartId: cartId
      }
    })

    console.log('=== (5）該購物車的商品資料 cartItemData ===')
    console.log('cartItemData', cartItemData)
    console.log('=== (5）該購物車的商品資料 cartItemData ===')

    // ===== Step 6. 建立與訂單有關的 OrderItem =====
    // 宣告 tempOrderId
    const tempOrderId = await orderData.id

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
        console.log('===== 購物車內容物 =====')
        console.log('item.dataValues', item.dataValues)
        console.log('===== 購物車內容物 =====')

        console.log('===== 外層傳入 =====')
        console.log('d.id', d.id)
        console.log('===== 外層傳入 =====')

        if (item.dataValues.ProductId == d.id) {
          console.log('回傳的商品數量', item.dataValues.quantity)
          return (qyt = item.dataValues.quantity)
        }
      })
      console.log('qyt', qyt)
      return qyt
    }

    console.log('==========================================')
    console.log('cartId', cartId)
    console.log('==========================================')

    const orderItemData = await Order.findAll({
      where: {
        sn: snNum
      },
      include: [{ model: Product, as: 'items' }]
    })

    console.log('=== (7）訂單的商品資料 orderItemData ===')
    console.log('orderItemData', orderItemData)
    console.log('=== (7）訂單的商品資料 orderItemData ===')

    // 將 cartId & orderId 存入 res.session 以供後續讀取資料使用
    req.session.cartId = cartId
    req.session.orderId = tempOrderId
    req.session.save()

    console.log('=== (7）回傳 session 內容 ===')
    console.log('req.session', req.session)
    console.log('=== (7）回傳 session 內容 ===')

    res.json({
      //cartData, // 回傳的購物車
      orderData, // 回傳的訂單資料
      //cartItemData, // 回傳的購物車商品資料
      orderItemData, // 回傳的訂單商品資料
      status: 'success',
      message: '成功新增一筆訂單'
    })
  },
  // 取得單一訂單的資料
  getOrder: async (req, res) => {
    console.log('=== (0）取得 req.session ===')
    console.log('req.session', req.session)
    console.log('=== (0）取得 req.session ===')

    const order = await Order.findOne({
      // ::TODO::（待修正） 暫時補 1，讓本機實作和測試可執行
      where: { id: req.session.orderId },
      include: [{ model: Product, as: 'items' }]
    })

    console.log('=== (1）取得訂單內容 內容 ===')
    console.log('order', order)
    console.log('order', order.items)
    console.log('=== (1）取得訂單內容 內容 ===')

    res.json({
      order,
      status: 'success',
      message: '成功取得單一訂單的資料'
    })
  }
}

module.exports = orderController
