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

    const product = await Product.findOne({
      where: {
        id: cartItem[0].ProductId
      }
    })

    // 若商品數量為 0，則回傳 cartItem，反之，則更新商品庫存數量(-1)
    if (product.stock_quantity === 0) {
      return { cartItem }
    } else {
      product.stock_quantity -= 1
      await product.save()
    }

    // 更新 cartItem 數量
    cartItem[0].quantity += 1
    await cartItem[0].save()

    return { cartItem, product }
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

    const product = await Product.findOne({
      where: {
        id: cartItem[0].ProductId
      }
    })
    // 更新商品庫存數量(+1)
    product.stock_quantity += 1
    await product.save()

    return cartItem
  },
  deleteItemFromCart: async (cartId, cartItemId) => {
    const data = await CartItem.findOne({
      where: {
        id: cartItemId
      }
    })

    // 1. 清除 CartItem 資訊
    await CartItem.destroy({
      where: { CartId: cartId, id: cartItemId }
    })

    const product = await Product.findOne({
      where: {
        id: data.ProductId
      }
    })

    // 2. 更新商品庫存數量(+ data.quantity)
    product.stock_quantity += data.quantity
    await product.save()
  },
  postCart: async (cartId, productInfo) => {
    const [cart] = await Cart.findOrCreate({
      where: {
        id: cartId || 0
      }
    })

    const [cartItem, isCartItemNew] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: productInfo.productId
      }
    })

    const product = await Product.findOne({
      where: {
        id: productInfo.productId
      }
    })

    // 若商品數量為 0，則回傳 cart, cartItem，反之，則更新商品庫存數量(-1)
    if (product.stock_quantity === 0) {
      return { cart, cartItem }
    } else {
      product.stock_quantity -= productInfo.quantity
      await product.save()
    }

    isCartItemNew
      ? (cartItem.quantity = parseInt(productInfo.quantity) || 1)
      : (cartItem.quantity = cartItem.quantity + (parseInt(productInfo.quantity) || 1))

    await cartItem.save()

    return {
      cart,
      cartItem,
      product
    }
  },
  putCart: async (shippingMethod, shippingFee, cartId) => {
    if (shippingMethod === '住家宅配') {
      shippingFee = 60
    }

    if (shippingMethod === '其他') {
      shippingFee = 100
    }

    await Cart.update({ shipping_method: shippingMethod, shipping_fee: shippingFee }, { where: { id: cartId } })

    const cart = await Cart.findOne({ where: { id: cartId } })

    return cart
  }
}

module.exports = cartService
