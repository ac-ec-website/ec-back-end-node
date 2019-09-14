const productService = require('../../services/productService')
const cartService = require('../../services/cartService')
const categoryService = require('../../services/categoryService')

const productController = {
  // 取得所有商品的資料
  getProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts()

      const cartId = req.session.cartId
      let cart = await cartService.getCart(cartId)
      cart = cart || { items: [] }

      const categories = await categoryService.getAllCategories()

      return res.json({
        products,
        cart,
        categories
      })
    } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
    }
  },
  getProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const product = await productService.getProduct(productId)

      const cartId = req.session.cartId
      let cart = await cartService.getCart(cartId)
      cart = cart || { items: [] }

      return res.json({
        product,
        cart
      })
    } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
    }
  }
}

module.exports = productController
