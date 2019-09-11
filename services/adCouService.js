const db = require('../models')
const { Coupon } = db

const adCouService = {
  getCoupons: async () => {
    const coupons = await Coupon.findAll()

    return { coupons }
  },

  getCoupon: async couponId => {
    const coupon = await Coupon.findByPk(couponId)

    return { coupon }
  },

  postCoupon: async data => {
    const coupon = await Coupon.create(data)

    return { coupon }
  },

  putCoupon: async (couponId, data) => {
    const coupon = await Coupon.findByPk(couponId)
    await coupon.update(data)

    return { coupon }
  },

  deleteCoupon: async couponId => {
    const coupon = await Coupon.findByPk(couponId)
    await coupon.destroy()
  }
}

module.exports = adCouService
