const db = require('../../models')
const { Discount } = db

const adminDiscount = {
  getDiscounts: async (req, res) => {
    const discounts = await Discount.findAll()

    return res.json({ discounts })
  },

  getDiscount: async (req, res) => {
    const discount = await Discount.findByPk(req.params.id)

    return res.json({ discount })
  },

  postDiscount: async (req, res) => {
    if (!req.body.name) {
      return res.json({ status: 'error', message: "name didn't exist" })
    }

    const discountData = await Discount.create(req.body)
    const discount = await Discount.findByPk(discountData.id)

    return res.json({ discount, status: 'success', message: 'Discount was successfully created' })
  },

  putDiscount: async (req, res) => {
    if (!req.body.shipping_free) {
      return res.json({ status: 'error', message: "shipping_free didn't exist" })
    }

    const discount = await Discount.findByPk(req.params.id)
    await discount.update(req.body)

    return res.json({ discount, status: 'success', message: 'Discount was successfully created' })
  },

  deleteDiscount: async (req, res) => {
    const discount = await Discount.findByPk(req.params.id)
    await discount.destroy()

    return res.json({ status: 'success', message: '' })
  }
}

module.exports = adminDiscount
