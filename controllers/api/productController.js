const db = require('./../../models')
const Product = db.Product
const Cart = db.Cart

const productController = {
  // 取得所有商品的資料
  getProducts: async (req, res) => {
    const products = await Product.findAll()
    const cart = await Cart.findByPk(req.session.cartId, { include: 'items' }).then(cart => {
      cart = cart || { items: [] }
      return cart
    })

    return res.json({
      products,
      cart
    })
  },
  getProduct: async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    const cart = await Cart.findByPk(req.session.cartId, { include: 'items' }).then(cart => {
      cart = cart || { items: [] }
      return cart
    })

    return res.json({
      product,
      cart
    })
  }
}

module.exports = productController
