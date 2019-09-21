const db = require('../../models')
const { Order, Coupon, Discount, Shipping } = db
const adOrdService = require('../../services/adOrdService')

const adminOrder = {
  getOrders: async (req, res) => {
    try {
      const { orders } = await adOrdService.getOrders()

      return res.json({ orders })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  getOrder: async (req, res) => {
    try {
      const orderId = req.params.id
      const { order } = await adOrdService.getOrder(orderId)

      return res.json({ order })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  },

  putOrder: async (req, res) => {
    try {
      if (!req.body.shipping_status || !req.body.payment_status) {
        return res.json({ status: 'error', message: "status didn't exist" })
      }

      const orderId = req.params.id
      const data = { ...req.body }
      const { order } = await adOrdService.putOrder(orderId, data)

      return res.json({ order, status: 'success', message: 'status was successfully created' })
    } catch (error) {
      console.log('error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = adminOrder
