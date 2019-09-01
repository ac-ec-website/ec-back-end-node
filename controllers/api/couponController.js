const db = require('./../../models')
// const Cart = db.Cart
// const CartItem = db.CartItem
// const Product = db.Product
const Coupon = db.Coupon

const couponController = {
  postCoupon: async (req, res) => {
    try {
      console.log('req.body', req.body)

      // 檢查 couponCode 是否為空，則回應請輸入 couponCode
      if (!req.body.couponCode) {
        return res.json({
          status: 'error',
          message: '請輸入 couponCode'
        })
      }

      const couponData = await Coupon.findOne({
        where: { coupon_code: req.body.couponCode }
      })

      // 若 couponData 為空，則回應查無此優惠券，請再次確認
      if (!couponData) {
        return res.json({
          status: 'error-notFound',
          message: '查無此優惠券，請再次確認'
        })
      }

      // 檢查優惠券數量
      if (couponData.limited_num < 1) {
        return res.json({
          status: 'error-cantBeUsed',
          message: '該優惠券已被使用完畢 哭哭QQ'
        })
      }

      // 優惠券使用後，數量減ㄧ
      couponData.limited_num -= 1
      couponData.save()

      return res.json({
        couponData,
        status: 'success',
        message: `成功使用名為 [${couponData.name}] 的優惠券 - 代碼為 ${req.body.couponCode}`
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = couponController
