const cartService = require('../../services/cartService')

const cartController = {
  // 取得單一購物車的資料
  getCart: async (req, res) => {
    try {
      if (!req.session.cartId) {
        return res.json({
          status: 'error',
          message: '目前無 cartId 資料'
        })
      }

      const cartId = req.session.cartId
      const cart = await cartService.getCart(cartId)

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
      console.log('error', error)
      return res.sendStatus(500)
    }
  },
  // 增加購物車內商品數量
  addItemToCart: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const cartItemId = req.params.id

      if (!cartId || !cartItemId) {
        return res.json({
          status: 'error',
          message: '目前無 cartId 資料或無 cartItemId 資料'
        })
      }

      const cartItem = await cartService.addItemToCart(cartId, cartItemId)

      if (cartItem === undefined) {
        return res.json({
          cartItem,
          status: 'error',
          message: '目前 cartItem 不存在，請重新確認'
        })
      }

      return res.json({
        cartItem,
        status: 'success',
        message: '成功增加購物車的商品數量'
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },
  // 減少購物車內商品數量
  subItemFromCart: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const cartItemId = req.params.id

      if (!cartId || !cartItemId) {
        return res.json({
          status: 'error',
          message: '目前無 cartId 資料或無 cartItemId 資料'
        })
      }

      const cartItem = await cartService.subItemFromCart(cartId, cartItemId)

      if (cartItem === undefined) {
        return res.json({
          cartItem,
          status: 'error',
          message: '目前 cartItem 不存在，請重新確認'
        })
      }

      return res.json({
        cartItem,
        status: 'success',
        message: '成功減少購物車的商品數量'
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },
  // 刪除購物車內的商品
  deleteItemFromCart: async (req, res) => {
    try {
      const cartId = req.params.cartId
      const cartItemId = req.params.id

      if (!cartId || !cartItemId) {
        return res.json({
          status: 'error',
          message: '目前無 cartId 資料或無 cartItemId 資料'
        })
      }

      await cartService.deleteItemFromCart(cartId, cartItemId)

      return res.json({
        status: 'success',
        message: '商品已刪除成功'
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
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
      // 自動清除先前的 coupon 資訊
      req.session.couponCode = undefined
      await req.session.save()

      res.json({
        status: 'success',
        cart,
        cartItem
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
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
      const shippingMethod = req.body.shipping_method
      const cartId = req.session.cartId

      const cart = await cartService.putCart(shippingMethod, shippingFee, cartId)

      return res.json({
        cart,
        status: 'success',
        message: '已更新購物車資料(配送方式)'
      })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = cartController
