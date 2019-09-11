const db = require('../models')
const { Discount } = db

const adDisService = {
  getDiscounts: async () => {
    const discounts = await Discount.findAll()

    return { discounts }
  },

  getDiscount: async discountId => {
    const discount = await Discount.findByPk(discountId)

    return { discount }
  },

  postDiscount: async data => {
    const discount = await Discount.create(data)

    return { discount }
  },

  putDiscount: async (discountId, data) => {
    const discount = await Discount.findByPk(discountId)
    await discount.update(data)

    return { discount }
  },

  deleteDiscount: async discountId => {
    const discount = await Discount.findByPk(discountId)
    await discount.destroy()
  }
}

module.exports = adDisService
