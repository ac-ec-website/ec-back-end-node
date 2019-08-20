const db = require('../../models')
const Product = db.Product
const Order = db.Order
const OrderItem = db.OrderItem

const adminOrder = {
  getOrders: async (req, res) => {
    const orders = await Order.findAll({ include: 'items' })

    return res.json({ orders })
  },

  getOrder: async (req, res) => {
    const order = await Order.findOne({
      where: { id: req.params.id },
      include: 'items'
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
