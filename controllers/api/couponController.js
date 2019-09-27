const couponService = require('../../services/couponService')

const couponController = {
  postCoupon: async (req, res) => {
    try {
      const couponCode = req.body.couponCode

      if (!couponCode) {
        return res.json({
          status: 'error',
          message: '請輸入 couponCode'
        })
      }

      let couponData = await couponService.postCoupon(couponCode)

      // 若 couponData 為空，則回應查無此優惠券，請再次確認
      if (!couponData) {
        return res.json({
          status: 'error-notFound',
          message: '查無此優惠券，請再次確認'
        })
      }

      // 檢查優惠券數量
      if (couponData.limited_num === 0) {
        return res.json({
          status: 'error-cantBeUsed',
          message: '該優惠券已被使用完畢 哭哭QQ'
        })
      }

      req.session.couponCode = couponCode
      await req.session.save()

      return res.json({
        couponData,
        status: 'success',
        message: `成功使用 [${couponData.name}] 優惠券`
      })
    } catch (error) {
      console.log('使用優惠券 error', error)
      return res.sendStatus(500)
    }
  },
  deleteCoupon: async (req, res) => {
    try {
      const couponCode = req.session.couponCode

      if (!couponCode) {
        return res.json({
          status: 'error',
          message: '請輸入 couponCode'
        })
      }

      let couponData = await couponService.deleteCoupon(couponCode)

      // 若 couponData 為空，則回應查無此優惠券，請再次確認
      if (!couponData) {
        return res.json({
          status: 'error-notFound',
          message: '查無此優惠券，請再次確認'
        })
      }

      req.session.couponCode = undefined
      await req.session.save()

      return res.json({
        couponData,
        status: 'success',
        message: `取消使用 [${couponData.name}] 優惠券`
      })
    } catch (error) {
      console.log('取消使用優惠券 error', error)
      return res.sendStatus(500)
    }
  },
  getCoupon: async (req, res) => {
    try {
      const couponCode = req.session.couponCode

      // 判斷 req.session.couponCode 是否為空
      if (!couponCode || couponCode === undefined) {
        return res.json({
          status: 'error',
          message: '目前沒有 couponCode'
        })
      }

      let couponData = await couponService.getCoupon(couponCode)

      // 若 couponData 為空，則回應查無此優惠券，請再次確認
      if (!couponData) {
        return res.json({
          status: 'error-notFound',
          message: '查無此優惠券，請再次確認'
        })
      }

      return res.json({
        couponData,
        status: 'success',
        message: `成功取得 [${couponData.name}] 優惠券資訊`
      })
    } catch (error) {
      console.log('取得優惠券 error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = couponController
