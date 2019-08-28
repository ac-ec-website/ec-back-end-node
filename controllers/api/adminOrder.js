const db = require('../../models')
const { Order, Coupon, Discount, Shipping } = db

const adminOrder = {
  getOrders: async (req, res) => {
    const orders = await Order.findAll({ include: [Shipping, 'items'] })

    return res.json({ orders })
  },

  getOrder: async (req, res) => {
    const order = await Order.findOne({
      where: { id: req.params.id },
      include: [Coupon, Discount, Shipping, 'items']
    })

    return res.json({ order })
  },

  putOrder: async (req, res) => {
    if (!req.body.shipping_status || !req.body.payment_status) {
      return res.json({ status: 'error', message: "status didn't exist" })
    }

    const order = await Order.findByPk(req.params.id)
    await order.update(req.body)

    return res.json({ order, status: 'success', message: 'status was successfully update' })
  }
}

module.exports = adminOrder
