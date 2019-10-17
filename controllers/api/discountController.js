const discountService = require('../../services/discountService')

const discountController = {
  getDiscount: async (req, res) => {
    try {
      const discountId = req.session.discountId

      console.log('discountId', discountId)

      // 判斷 req.session.couponCode 是否為空
      if (!discountId || discountId === undefined) {
        return res.json({
          status: 'error',
          message: '此消費不適用特價活動'
        })
      }

      const discountData = await discountService.getDiscount(discountId)

      return res.json({
        discountData,
        status: 'success',
        message: `成功取得 [${discountData.name}] 優惠券資訊`
      })
    } catch (error) {
      console.log('取得特價活動 error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = discountController
