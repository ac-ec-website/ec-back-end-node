const productService = require('../../services/productService')
const cartService = require('../../services/cartService')
const categoryService = require('../../services/categoryService')

const productController = {
  // 取得所有商品的資料
  getProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts()

      let cart
      const cartId = req.session.cartId

      if (cartId === undefined) {
        cart = { items: [] }
      } else {
        cart = await cartService.getCart(cartId)
      }

      const categories = await categoryService.getAllCategories()

      return res.json({
        products,
        cart,
        categories,
        status: 'success'
      })
    } catch (error) {
      console.log('getProducts error', error)
      return res.sendStatus(500)
    }
  },
  getProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const product = await productService.getProduct(productId)

      let cart
      const cartId = req.session.cartId

      if (cartId === undefined) {
        cart = { items: [] }
      } else {
        cart = await cartService.getCart(cartId)
      }

      return res.json({
        product,
        cart,
        status: 'success'
      })
    } catch (error) {
      console.log('getProduct error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = productController
