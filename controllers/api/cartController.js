const db = require('./../../models')
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const cartController = {
  // 取得單一購物車的資料
  getCart: async (req, res) => {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, as: 'items' }]
    })

    let total_amount =
      cart.items.length > 0
        ? cart.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b)
        : 0

    return res.json({
      cart,
      total_amount
    })
  },
  // 增加購物車內商品數量
  addItemToCart: async (req, res) => {
    try {
      const cartItem = await CartItem.findAll({
        where: { CartId: req.params.cartId, id: req.params.id }
      })

      cartItem[0].quantity += 1
      cartItem[0].save()

      await res.json({
        cartItem
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 減少購物車內商品數量
  subItemFromCart: async (req, res) => {
    try {
      const cartItem = await CartItem.findAll({
        where: { CartId: req.params.cartId, id: req.params.id }
      })

      cartItem[0].quantity -= 1
      cartItem[0].save()

      await res.json({
        cartItem
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 刪除購物車內的商品
  deleteItemFromCart: async (req, res) => {
    try {
      const cartItem = await CartItem.destroy({
        where: { CartId: req.params.cartId, id: req.params.id }
      })

      await res.json({
        status: 'success',
        message: '已刪除成功'
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = cartController
