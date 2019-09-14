const db = require('../models')
const Product = db.Product
const Category = db.Category

const productService = {
  getAllProducts: async () => {
    const products = await Product.findAll({
      include: [
        {
          model: Category
        }
      ]
    })

    return products
  },
  getProduct: async productId => {
    const product = await Product.findByPk(productId)

    return product
  }
}

module.exports = productService
