const db = require('../models')
const Product = db.Product
const Category = db.Category

const productService = {
  getAllProducts: async () => {
    const products = await Product.findAll({ include: [{ model: Category }] })
    const productsLive = products.filter(product => {
      return product.product_status === true
    })
    productsLive.sort((a, b) => a.id - b.id)

    return productsLive
  },
  getProduct: async productId => {
    const product = await Product.findByPk(productId)
    if (product.product_status === true) {
      return product
    }
    throw 'product not active'
  }
}

module.exports = productService
