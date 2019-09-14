const db = require('../models')
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const cartService = {
  getCart: async cartId => {
    const cart = await Cart.findByPk(cartId, { include: 'items' })

    return cart
  },
  postCart: async (cartId, productInfo) => {
    let [cart, isCartNew] = await Cart.findOrCreate({
      where: {
        id: cartId || 0
      }
    })

    let [cartItem, isCartItemNew] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: productInfo.productId
      }
    })

    isCartItemNew
      ? (cartItem.quantity = parseInt(productInfo.quantity) || 1)
      : (cartItem.quantity = cartItem.quantity + (parseInt(productInfo.quantity) || 1))

    await cartItem.save()
    return {
      cart,
      cartItem
    }
  }
}

module.exports = cartService
