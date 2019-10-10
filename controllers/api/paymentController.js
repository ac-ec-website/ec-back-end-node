require('dotenv').config()

const paymentService = require('../../services/paymentService')

const paymentController = {
  getPayment: async (req, res) => {
    try {
      // console.log('===== getPayment =====')
      // console.log(req.session.orderId)
      // console.log('==========')

      const orderId = req.session.orderId
      const paymentId = req.session.paymentId
      const { order, tradeInfo } = await paymentService.getPayment(orderId, paymentId)

      return res.json({ order, tradeInfo })
    } catch (error) {
      console.log('getPayment error', error)
      res.sendStatus(500)
    }
  },
  spgatewayCallback: async (req, res) => {
    try {
      // console.log('===== spgatewayCallback =====')
      // console.log(req.method)
      // console.log(req.query)
      // console.log(req.body)
      // console.log('==========')

      // console.log('===== spgatewayCallback: TradeInfo =====')
      // console.log(req.body.TradeInfo)

      const tradeInfo = req.body.TradeInfo
      await paymentService.spgatewayCallback(tradeInfo)

      return res.redirect('https://ac-ec-website.github.io/ec-front-end-vue/dist/#/order')

      // return res.redirect('http://localhost:8080/#/order')
    } catch (error) {
      console.log('spgatewayCallback error', error)
      res.sendStatus(500)
    }
  }
}

module.exports = paymentController
