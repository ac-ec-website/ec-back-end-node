const db = require('../../models')
const Order = db.Order
const OrderItem = db.OrderItem
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const orderController = {
  postOrder: async (req, res) => {
    // Step 1. 檢查客戶資料是否填寫完整
    if (
      !req.body.orderCustomerName ||
      !req.body.orderCustomerEmail ||
      !req.body.orderCustomerPhone ||
      !req.body.orderCustomerAddress
    ) {
      return res.json({ status: 'error', message: '請填寫所有的欄位' })
    }

    const cartId = req.session.cartId
    console.log('=== 新增訂單，後端接受到的 cartId 資料 ===')
    console.log('cartId', cartId)
    console.log('=== 新增訂單，後端接受到的 cartId 資料 ===')

    // Step 2-1. 取得該購物車（獲取總價資料）

    const CartData = await Cart.findOne({
      where: {
        id: cartId
      },
      include: [{ model: Product, as: 'items' }]
    })
    console.log('=== 新增訂單，後端接受到的  CartData 資料 ===')
    console.log('CartData', CartData)
    console.log('=== 新增訂單，後端接受到的  CartData 資料 ===')

    // Step 2-2. 計算與商品總價有關的資訊
    let total_amount =
      CartData.items.length > 0
        ? CartData.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b)
        : 0

    console.log('=== 商品總價 ===')
    console.log('total_amount', total_amount)
    console.log('=== 商品總價 ===')

    // Step 3-1. 創建訂單

    const orderData = await Order.create({
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
      UserId: null
    })

    // Step 3-2. 取出剛才創建訂單

    const order = await Order.findOne({
      where: {
        sn: cartId
      },
      include: [{ model: Product, as: 'items' }]
    })

    console.log('=== 訂單資料 ===')
    console.log('order', order)
    console.log('=== 訂單資料 ===')

    // ::TODO:: Step 4-1. 取得與該購物車有關的商品資料

    const CartItemData = await CartItem.findAll({
      where: {
        CartId: cartId
      }
    })
    console.log('=== 新增訂單，後端接受到的  CartItemData 資料 ===')
    console.log('CartItemData', CartItemData)
    console.log('=== 新增訂單，後端接受到的  CartItemData 資料 ===')

    // ::TODO:: Step 4-2. 建立 OrderItem，並傳入與 cartId 有關的 CartItem 商品資料

    const OrderItemData = await OrderItem.create({
      price: 0,
      quantity: 0,
      OrderId: 0,
      ProductId: 0
    })

    // ::TODO:: Step 4-3. 取出剛才創建訂單

    const orderItem = await orderItem.findAll({
      where: {
        id: OrderItemData.id
      }
    })

    return res.json({
      CartData,
      total_amount,
      OrderData,
      order,

      // ::TODO:: CartItemData,
      // ::TODO:: OrderItemData,
      // ::TODO::orderItem,
      status: 'success',
      message: 'Order was successfully created'
    })
  }
}

module.exports = orderController
