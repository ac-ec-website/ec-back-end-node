const db = require('../../models')
const { Coupon } = db
const adCouService = require('../../services/adCouService')

const adminCoupon = {
  getCoupons: async (req, res) => {
    try {
      const { coupons } = await adCouService.getCoupons()

      return res.json({ coupons })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  getCoupon: async (req, res) => {
    try {
      const couponId = req.params.id
      const { coupon } = await adCouService.getCoupon(couponId)

      return res.json({ coupon })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  postCoupon: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const data = { ...req.body }
      const { coupon } = await adCouService.postCoupon(data)

      return res.json({ coupon, status: 'success', message: 'coupon was successfully created' })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  putCoupon: async (req, res) => {
    try {
      if (!req.body.shipping_free) {
        return res.json({ status: 'error', message: "shipping_free didn't exist" })
      }

      const couponId = req.params.id
      const data = { ...req.body }
      const { coupon } = await adCouService.putCoupon(couponId, data)

      return res.json({ coupon, status: 'success', message: 'coupon was successfully created' })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  deleteCoupon: async (req, res) => {
    try {
      const couponId = req.params.id
      await adCouService.deleteCoupon(couponId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      return res.status(422).json(error)
    }
  }
}

module.exports = adminCoupon
