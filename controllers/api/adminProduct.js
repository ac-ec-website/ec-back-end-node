const db = require('../../models')
const { Category, Product } = db
const adProService = require('../../services/adProService')

const adminProduct = {
  getProducts: async (req, res) => {
    try {
      const { products } = await adProService.getProducts()

      return res.json({ products })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  getProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const { product } = await adProService.getProduct(productId)

      return res.json({ product })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  postProduct: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const { file } = req
      const data = { ...req.body }
      const { product } = await adProService.postProduct(file, data)

      return res.json({ product, status: 'success', message: 'Product was successfully created' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  putProduct: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const productId = req.params.id
      const { file } = req
      const data = { ...req.body }
      const { product } = await adProService.putProduct(productId, file, data)

      return res.json({ product, status: 'success', message: 'Product was successfully created' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id
      await adProService.deleteProduct(productId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = adminProduct
