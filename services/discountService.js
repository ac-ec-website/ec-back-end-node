const db = require('../models')
const Discount = db.Discount

const discountService = {
  getDiscounts: async (cart, totalAmount) => {
    let discountData = {}
    const timeStamp = cart.updatedAt
    let array = []

    let data = await Discount.findAll()

    // 取出符合時效性的特價活動資料
    for (let i = 0; i < data.length; i++) {
      if (data[i].start_date < timeStamp && data[i].end_date > timeStamp) {
        array.push(data[i])
      }
    }

    // 取出 > total_amount 的最優惠值
    for (let i = 0; i < array.length; i++) {
      if (totalAmount >= array[i].target_price) {
        return (discountData = array[i])
      }
    }

    return discountData
  },
  getDiscount: async discountId => {
    const discount = await Discount.findOne({
      where: { id: discountId }
    })
    return discount
  },
  getDiscountFee: async (discountData, shippingFee, totalAmount) => {
    let discountFee = 0
    // 運費相關
    if (discountData.type === 0 && discountData.shipping_free === 1) {
      discountFee = shippingFee
    }

    // 折價相關
    if (discountData.type === 1 && discountData.product_reduce !== null) {
      discountFee = discountData.product_reduce
    }

    // 打折相關
    if (discountData.type === 2 && discountData.percent !== null) {
      const discount = 1 - discountData.percent / 100
      discountFee = Math.round(totalAmount * discount)
    }

    return discountFee
  }
}

module.exports = discountService
