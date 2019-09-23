const db = require('../models')
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const cartService = {
  getCart: async cartId => {
    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [{ model: Product, as: 'items' }]
    })

    return cart
  },
  addItemToCart: async (cartId, cartItemId) => {
    const cartItem = await CartItem.findAll({
      where: { CartId: cartId, id: cartItemId }
    })

    if (cartItem[0] === undefined) {
      return
    }

    cartItem[0].quantity += 1
    await cartItem[0].save()

    return cartItem
  },
  subItemFromCart: async (cartId, cartItemId) => {
    const cartItem = await CartItem.findAll({
      where: { CartId: cartId, id: cartItemId }
    })

    if (cartItem[0] === undefined) {
      return
    }

    if (cartItem[0].quantity > 1) {
      cartItem[0].quantity -= 1
      await cartItem[0].save()
    } else {
      cartItem[0].quantity = 0
      await cartItem[0].save()
    }

    return cartItem
  },
  deleteItemFromCart: async (cartId, cartItemId) => {
    await CartItem.destroy({
      where: { CartId: cartId, id: cartItemId }
    })

    return
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
  },
  putCart: async (shippingMethod, shippingFee, cartId) => {
    if (shippingMethod === '住家宅配') {
      shippingFee = 60
    }

    if (shippingMethod === '其他') {
      shippingFee = 100
    }

    await Cart.update(
      { shipping_method: shippingMethod, shipping_fee: shippingFee },
      { where: { id: cartId } }
    )

    const cart = await Cart.findOne({ where: { id: cartId } })

    return cart
  }
}

module.exports = cartService
