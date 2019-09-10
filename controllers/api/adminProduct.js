const db = require('../../models')
const { Category, Product } = db
const adProService = require('../../services/adProService')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminProduct = {
  getProducts: async (req, res) => {
    try {
      const { products } = await adProService.getProducts()

      return res.json({ products })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  getProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const { product } = await adProService.getProduct(productId)

      return res.json({ product })
    } catch (error) {
      return res.status(422).json(error)
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
      return res.status(422).json(error)
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
      return res.status(422).json(error)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id
      await adProService.deleteProduct(productId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      return res.status(422).json(error)
    }
  }
}

module.exports = adminProduct
