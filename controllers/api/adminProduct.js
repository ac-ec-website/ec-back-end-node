const db = require('../../models')
const { Category, Product } = db

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminProduct = {
  getProducts: async (req, res) => {
    const products = await Product.findAll({ include: [Category] })

    return res.json({ products })
  },

  getProduct: async (req, res) => {
    const product = await Product.findByPk(req.params.id, { include: [Category] })

    return res.json({ product })
  },

  postProduct: async (req, res) => {
    if (!req.body.name) {
      return res.json({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        const productData = await Product.create({
          name: req.body.name,
          description: req.body.description,
          stock_quantity: req.body.stock_quantity,
          cost_price: req.body.cost_price,
          origin_price: req.body.origin_price,
          sell_price: req.body.sell_price,
          product_status: req.body.product_status,
          image: file ? img.data.link : null
        })
        const product = await Product.findByPk(productData.id)

        return res.json({ product, status: 'success', message: 'Product was successfully created' })
      })
    } else {
      const productData = await Product.create({
        name: req.body.name,
        description: req.body.description,
        stock_quantity: req.body.stock_quantity,
        cost_price: req.body.cost_price,
        origin_price: req.body.origin_price,
        sell_price: req.body.sell_price,
        product_status: req.body.product_status,
        image: null
      })
      const product = await Product.findByPk(productData.id)

      return res.json({ product, status: 'success', message: 'Product was successfully created' })
    }
  },

  putProduct: async (req, res) => {
    if (!req.body.name) {
      return res.json({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        const product = await Product.findByPk(req.params.id)
        await product.update({
          name: req.body.name,
          description: req.body.description,
          stock_quantity: req.body.stock_quantity,
          cost_price: req.body.cost_price,
          origin_price: req.body.origin_price,
          sell_price: req.body.sell_price,
          product_status: req.body.product_status,
          image: file ? img.data.link : product.image
        })

        return res.json({ product, status: 'success', message: 'Product was successfully update' })
      })
    } else {
      const product = await Product.findByPk(req.params.id)
      await product.update({
        name: req.body.name,
        description: req.body.description,
        stock_quantity: req.body.stock_quantity,
        cost_price: req.body.cost_price,
        origin_price: req.body.origin_price,
        sell_price: req.body.sell_price,
        product_status: req.body.product_status,
        image: product.image
      })

      return res.json({ product, status: 'success', message: 'Product was successfully update' })
    }
  },

  deleteProduct: async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()

    return res.json({ status: 'success', message: '' })
  }
}

module.exports = adminProduct
