const db = require('../../models')
const { Coupon } = db

const adminCoupon = {
  getCoupons: async (req, res) => {
    const coupons = await Coupon.findAll()

    return res.json({ coupons })
  },

  getCoupon: async (req, res) => {
    const coupon = await Coupon.findByPk(req.params.id)

    return res.json({ coupon })
  },

  postCoupon: async (req, res) => {
    if (!req.body.name) {
      return res.json({ status: 'error', message: "name didn't exist" })
    }

    const couponData = await Coupon.create(req.body)
    const coupon = await Coupon.findByPk(couponData.id)

    return res.json({ coupon, status: 'success', message: 'coupon was successfully created' })
  },

  putCoupon: async (req, res) => {
    if (!req.body.shipping_free) {
      return res.json({ status: 'error', message: "shipping_free didn't exist" })
    }

    const coupon = await Coupon.findByPk(req.params.id)
    await coupon.update(req.body)

    return res.json({ coupon, status: 'success', message: 'coupon was successfully created' })
  },

  deleteCoupon: async (req, res) => {
    const coupon = await Coupon.findByPk(req.params.id)
    await coupon.destroy()

    return res.json({ status: 'success', message: '' })
  }
}

module.exports = adminCoupon
