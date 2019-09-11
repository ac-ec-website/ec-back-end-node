const db = require('../models')
const { Category, Product } = db

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adProService = {
  getProducts: async () => {
    const products = await Product.findAll({ include: [Category] })

    return { products }
  },

  getProduct: async productId => {
    const product = await Product.findByPk(productId, { include: [Category] })

    return { product }
  },

  postProduct: async (file, data) => {
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        const product = await Product.create({
          ...data,
          image: file ? img.data.link : null
        })

        return { product }
      })
    } else {
      const product = await Product.create({
        ...data,
        image: null
      })

      return { product }
    }
  },

  putProduct: async (productId, file, data) => {
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        const product = await Product.findByPk(productId)
        await product.update({
          ...data,
          image: file ? img.data.link : product.image
        })

        return { product }
      })
    } else {
      const product = await Product.findByPk(productId)
      await product.update({
        ...data,
        image: product.image
      })

      return { product }
    }
  },

  deleteProduct: async productId => {
    const product = await Product.findByPk(productId)
    await product.destroy()
  }
}

module.exports = adProService
