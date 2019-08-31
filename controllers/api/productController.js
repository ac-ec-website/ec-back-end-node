const db = require('./../../models')
const Product = db.Product
const Cart = db.Cart
const Category = db.Category

const productController = {
  // 取得所有商品的資料
  getProducts: async (req, res) => {
    const products = await Product.findAll({
      include: [
        {
          model: Category
        }
      ]
    })
    const cart = await Cart.findByPk(req.session.cartId, { include: 'items' }).then(cart => {
      cart = cart || { items: [] }
      return cart
    })

    const categories = await Category.findAll()

    return res.json({
      products,
      cart,
      categories
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
