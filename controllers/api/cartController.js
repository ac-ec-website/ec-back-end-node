const db = require('./../../models')
const Cart = db.Cart
const CartItem = db.CartItem

const cartController = {
  postCart: async (req, res) => {
    if (!req.body.productId) {
      return res.json({
        status: 'error',
        message: 'req.body 缺少 productId'
      })
    }

    let [cart, isCartNew] = await Cart.findOrCreate({
      where: {
        id: req.session.cartId || 0
      }
    })

    let [cartItem, isCartItemNew] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: req.body.productId
      }
    })

    isCartItemNew ? (cartItem.quantity = 1) : cartItem.quantity++
    await cartItem.save()

    req.session.cartId = cart.id
    req.session.save()
    res.json({
      status: 'success',
      cart,
      cartItem
    })
  }
}

module.exports = cartController
