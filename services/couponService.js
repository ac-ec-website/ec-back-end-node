const db = require('../models')
const Coupon = db.Coupon

const couponService = {
  postCoupon: async couponCode => {
    const couponData = await Coupon.findOne({
      where: { coupon_code: couponCode }
    })

    // 若 couponData 為空，則回應查無此優惠券，請再次確認
    if (!couponData) {
      return couponData
    }

    // 檢查優惠券數量
    if (couponData.limited_num < 1) {
      return couponData
    }

    // 優惠券使用後，數量減ㄧ
    couponData.limited_num -= 1
    await couponData.save()

    return couponData
  },
  deleteCoupon: async couponCode => {
    const couponData = await Coupon.findOne({
      where: { coupon_code: couponCode }
    })

    // 若 couponData 為空，則回應查無此優惠券，請再次確認
    if (!couponData) {
      return couponData
    }

    // 取消使用優惠券後，數量加ㄧ
    couponData.limited_num += 1
    await couponData.save()

    return couponData
  },
  getCoupon: async couponCode => {
    const couponData = await Coupon.findOne({
      where: { coupon_code: couponCode }
    })

    // 若 couponData 為空，則回應查無此優惠券，請再次確認
    if (!couponData) {
      return couponData
    }

    return couponData
  },
  getCouponDiscountFee: async (couponData, shippingFee, totalAmount) => {
    let couponDiscountFee = 0
    // 運費相關
    if (couponData.type === 0 && couponData.shipping_free === 1) {
      couponDiscountFee = shippingFee
    }

    // 折價相關
    if (couponData.type === 1 && couponData.product_reduce !== null) {
      couponDiscountFee = couponData.product_reduce
    }

    // 打折相關
    if (couponData.type === 2 && couponData.percent !== null) {
      const discount = 1 - couponData.percent / 100
      couponDiscountFee = Math.round(totalAmount * discount)
    }

    return couponDiscountFee
  }
}

module.exports = couponService
