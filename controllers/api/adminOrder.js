const db = require('../../models')
const { Order, Coupon, Discount, Shipping } = db
const adOrdService = require('../../services/adOrdService')
const emailNotify = require('../emailNotify')

const adminOrder = {
  getOrders: async (req, res) => {
    try {
      const { orders } = await adOrdService.getOrders()

      return res.json({ orders })
    } catch (error) {
      console.log('取得後台訂單 error', error)
      return res.sendStatus(500)
    }
  },

  getOrder: async (req, res) => {
    try {
      const orderId = req.params.id
      const { order } = await adOrdService.getOrder(orderId)

      return res.json({ order })
    } catch (error) {
      console.log('單一後台訂單 error', error)
      return res.sendStatus(500)
    }
  },

  putOrder: async (req, res) => {
    try {
      if (!req.body.shipping_status || !req.body.payment_status) {
        return res.json({ status: 'error', message: "status didn't exist" })
      }

      const orderId = req.params.id
      const data = { ...req.body }
      const { order } = await adOrdService.putOrder(orderId, data)

      if (order.payment_status === '1') {
        // 訂單付款狀態變更為「已付款」 Email
        const buyerEmail = order.email
        const emailSubject = `[GPW 電商網站系統信]：您的訂單 #${order.id} 已成功付款！`
        const emailContent = `<h4>${order.name} 你好</h4>
      <p>您的訂單已成功付款，本次訂單金額為 $ ${order.checkoutPrice} 元，若有任何問題，歡迎隨時與我們聯繫，感謝！</p>`

        emailNotify.sendEmail(buyerEmail, emailSubject, emailContent)
      }

      if (order.shipping_status === '1') {
        // 訂單配送狀態變更為「配送」 Email
        const buyerEmail = order.email
        const emailSubject = `[GPW 電商網站系統信]：您的訂單 #${order.id} 已出貨！`
        const emailContent = `<h4>${order.name} 你好</h4>
      <p>您的訂單已出貨，若有任何問題，歡迎隨時與我們聯繫，感謝！</p>`

        emailNotify.sendEmail(buyerEmail, emailSubject, emailContent)
      }

      return res.json({ order, status: 'success', message: 'status was successfully created' })
    } catch (error) {
      console.log('更新後台訂單 error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = adminOrder
