const adCouService = require('../../services/adCouService')

const adminCoupon = {
  getCoupons: async (req, res) => {
    try {
      const { coupons } = await adCouService.getCoupons()

      return res.json({ coupons })
    } catch (error) {
      console.log('取得後台優惠券 error', error)
      return res.sendStatus(500)
    }
  },

  getCoupon: async (req, res) => {
    try {
      const couponId = req.params.id
      const { coupon } = await adCouService.getCoupon(couponId)

      return res.json({ coupon })
    } catch (error) {
      console.log('單一後台優惠券 error', error)
      return res.sendStatus(500)
    }
  },

  postCoupon: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const data = { ...req.body }
      const { coupon } = await adCouService.postCoupon(data)

      return res.json({ coupon, status: 'success', message: 'Coupon was successfully created' })
    } catch (error) {
      console.log('新增後台優惠券 error', error)
      return res.sendStatus(500)
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

      return res.json({ coupon, status: 'success', message: 'Coupon was successfully updated' })
    } catch (error) {
      console.log('更新後台優惠券 error', error)
      return res.sendStatus(500)
    }
  },

  deleteCoupon: async (req, res) => {
    try {
      const couponId = req.params.id
      await adCouService.deleteCoupon(couponId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      console.log('刪除後台優惠券 error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = adminCoupon
