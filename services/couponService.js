const db = require('../models')
const Coupon = db.Coupon

const couponService = {
  postCoupon: async couponCode => {
    const couponData = await Coupon.findOne({
      where: { coupon_code: couponCode }
    })

    // 若 couponData 為空，則回應查無此優惠券，請再次確認
    if (!couponData) {
      return { couponData }
    }

    // 檢查優惠券數量
    if (couponData.limited_num < 1) {
      return { couponData }
    }

    // 優惠券使用後，數量減ㄧ
    couponData.limited_num -= 1
    couponData.save()

    return { couponData }
  },
  deleteCoupon: async couponCode => {
    const couponData = await Coupon.findOne({
      where: { coupon_code: couponCode }
    })

    // 若 couponData 為空，則回應查無此優惠券，請再次確認
    if (!couponData) {
      return { couponData }
    }

    // 取消使用優惠券後，數量加ㄧ
    couponData.limited_num += 1
    couponData.save()

    return { couponData }
  },
  getCoupon: async couponCode => {
    const couponData = await Coupon.findOne({
      where: { coupon_code: couponCode }
    })

    // 若 couponData 為空，則回應查無此優惠券，請再次確認
    if (!couponData) {
      return { couponData }
    }

    return { couponData }
  }
}

module.exports = couponService
