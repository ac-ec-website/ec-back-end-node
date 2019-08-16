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
  }
}

module.exports = adminOrder
