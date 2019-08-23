const db = require('../../models')
const Order = db.Order
const OrderItem = db.OrderItem
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const orderController = {
  postOrder: async (req, res) => {
    // ===== Step 1. 檢查客戶資料是否填寫完整 =====
    if (
      !req.body.orderCustomerName ||
      !req.body.orderCustomerEmail ||
      !req.body.orderCustomerPhone ||
      !req.body.orderCustomerAddress
    ) {
      return res.json({ status: 'error', message: '請填寫所有的欄位' })
    }

    const cartId = req.session.cartId || 1
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

    // ===== Step 4. 創建訂單 =====
    const order = await Order.create({
      // ::TODO:: 暫時讓 sn = cartId
      sn: cartId,
      total_amount: total_amount,
      name: req.body.orderCustomerName,
      email: req.body.orderCustomerEmail,
      phone: req.body.orderCustomerPhone,
      address: req.body.orderCustomerAddress,
      shipping_status: false,
      payment_status: false,
      // ::TODO:: 等 User 建立後再行修改
      UserId: null,
      CouponId: null
    })

    const orderData = await Order.findOne({
      where: {
        sn: cartId
      }
    })

    console.log('=== (4）訂單資料 orderData 資料 ===')
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
    // ::TODO:: 建立 OrderItem，並傳入與 cartId 有關的 CartItem 商品資料

    const orderItem = await cartData.items.map(async d => {
      const data = await OrderItem.create({
        price: d.sell_price,
        OrderId: order.sn,
        ProductId: d.id,
        // ::TODO:: 需要從 cartItem 中，透過商品 id，取得其購買的商品數量
        // ::TODO:: 無法正常寫入 DB，已確認為 number(integer)
        quantity: 100
        // quantity: await cartItemData.map(item => {
        //   console.log('===== 購物車內容物 =====')
        //   console.log('item.dataValues', item.dataValues)
        //   console.log('===== 購物車內容物 =====')

        //   console.log('===== 外層傳入 =====')
        //   console.log('d.id', d.id)
        //   console.log('===== 外層傳入 =====')

        //   if (item.dataValues.ProductId == d.id) {
        //     console.log('回傳的商品數量', item.dataValues.quantity)
        //     return item.dataValues.quantity
        //   }
        // })
      })
    })

    const orderItemData = await OrderItem.findAll({
      where: {
        OrderId: order.sn
      }
    })

    console.log('=== (6）訂單的商品資料 orderData ===')
    console.log('orderItemData', orderItemData)
    console.log('=== (6）訂單的商品資料 orderData ===')

    return res.json({
      cartData, // 回傳的購物車
      orderData, // 回傳的訂單資料
      cartItemData, // 回傳的購物車商品資料
      orderItemData, // 回傳的訂單商品資料
      status: 'success',
      message: 'Order was successfully created'
    })
  }
}

module.exports = orderController
