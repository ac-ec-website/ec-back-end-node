const db = require('../models')
const { Order, Coupon, Discount, Shipping } = db

const adOrdService = {
  getOrders: async () => {
    const orders = await Order.findAll({ include: [Shipping, 'items'] })

    return { orders }
  },

  getOrder: async orderId => {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [Coupon, Discount, Shipping, 'items']
    })

    return { order }
  },

  putOrder: async (orderId, data) => {
    const order = await Order.findByPk(orderId)
    await order.update(data)

    return { order }
  }
}

module.exports = adOrdService
