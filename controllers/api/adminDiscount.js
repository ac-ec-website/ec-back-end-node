const db = require('../../models')
const { Discount } = db
const adDisService = require('../../services/adDisService')

const adminDiscount = {
  getDiscounts: async (req, res) => {
    try {
      const { discounts } = await adDisService.getDiscounts()

      return res.json({ discounts })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  getDiscount: async (req, res) => {
    try {
      const discountId = req.params.id
      const { discount } = await adDisService.getDiscount(discountId)

      return res.json({ discount })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  postDiscount: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const data = { ...req.body }
      const { discount } = await adDisService.postDiscount(data)

      return res.json({ discount, status: 'success', message: 'Discount was successfully created' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  putDiscount: async (req, res) => {
    try {
      if (!req.body.shipping_free) {
        return res.json({ status: 'error', message: "shipping_free didn't exist" })
      }

      const discountId = req.params.id
      const data = { ...req.body }
      const { discount } = await adDisService.putDiscount(discountId, data)

      return res.json({ discount, status: 'success', message: 'Discount was successfully created' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  deleteDiscount: async (req, res) => {
    try {
      const discountId = req.params.id
      await adDisService.deleteDiscount(discountId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = adminDiscount
