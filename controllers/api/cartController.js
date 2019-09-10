const db = require('./../../models')
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product
const cartService = require('../../services/cartService')

const cartController = {
  // 取得單一購物車的資料
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        where: { id: req.session.cartId },
        include: [{ model: Product, as: 'items' }]
      })

      const total_amount =
        cart.items.length > 0
          ? cart.items.map(d => d.sell_price * d.CartItem.quantity).reduce((a, b) => a + b)
          : 0

      return res.json({
        cart,
        total_amount,
        status: 'success',
        message: '成功取得購物車的資料'
      })
    } catch (error) {
      if (!req.session.cartId) {
        return res.json({
          status: 'error',
          message: '目前尚無 cartId'
        })
      }
    }
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
        cartItem,
        status: 'success',
        message: '成功增加購物車的商品數量'
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

      if (cartItem[0].quantity > 1) {
        cartItem[0].quantity -= 1
        cartItem[0].save()
      } else {
        cartItem[0].quantity = 0
        cartItem[0].save()
      }

      await res.json({
        cartItem,
        status: 'success',
        message: '成功減少購物車的商品數量'
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
  },

  postCart: async (req, res) => {
    try {
      if (!req.body.productId) {
        return res.json({
          status: 'error',
          message: 'req.body 缺少 productId'
        })
      }

      const cartId = req.session.cartId
      const productInfo = {
        productId: req.body.productId,
        quantity: req.body.quantity
      }

      let { cart, cartItem } = await cartService.postCart(cartId, productInfo)

      req.session.cartId = cart.id
      req.session.save()

      res.json({
        status: 'success',
        cart,
        cartItem
      })
    } catch (error) {
      console.log(error.message)
      res.sendStatus(500).json({
        status: 'error'
      })
    }
  },
  // 更新購物車資料
  putCart: async (req, res) => {
    try {
      if (!req.body.shipping_method) {
        return res.json({
          status: 'error',
          message: '請填寫配送方式'
        })
      }

      let shippingFee = 0

      if (req.body.shipping_method === '住家宅配') {
        shippingFee = 60
      }

      if (req.body.shipping_method === '其他') {
        shippingFee = 100
      }

      await Cart.update(
        { shipping_method: req.body.shipping_method, shipping_fee: shippingFee },
        { where: { id: req.session.cartId } }
      )

      const cart = await Cart.findOne({ where: { id: req.session.cartId } })

      return res.json({
        cart,
        status: 'success',
        message: '已更新購物車資料(配送方式)'
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = cartController
