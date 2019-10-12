/* eslint-env mocha */
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Order Controller', () => {
  describe('POST Order - 新增訂單', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Coupon.create({
        id: 1,
        type: 1,
        coupon_code: '1111',
        limited_num: 1
      })
    })

    it('（O）成功創建一筆訂單', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .post('/api/coupon')
            .send('couponCode=1111')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)

              agent
                .put('/api/cart')
                .send('shipping_method=住家宅配')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                  if (err) return done(err)

                  agent
                    .post('/api/order')
                    .send(
                      'orderCustomerName=root&orderCustomerEmail=root@example.com&orderCustomerPhone=0912345678&orderCustomerAddress=test&orderRecipientName=user1&orderRecipientPhone=0912345678&orderRecipientAddress=test'
                    )
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                      if (err) return done(err)
                      // 訂單資訊
                      expect(res.body.orderData.id).to.be.equal(1)
                      expect(res.body.status).to.be.equal('success')

                      done()
                    })
                })
            })
        })
    })

    it('（X）訂單創建失敗，請填寫訂單配送資料欄位', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .put('/api/cart')
            .send('shipping_method=住家宅配')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)

              agent
                .post('/api/order')
                .send(
                  'orderCustomerName=root&orderCustomerEmail=root@example.com&orderCustomerPhone=0912345678&orderCustomerAddress=test'
                )
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                  if (err) return done(err)
                  expect(res.body.status).to.be.equal('error')
                  expect(res.body.message).to.be.equal('請填寫訂單配送資料欄位')

                  done()
                })
            })
        })
    })

    it('（X）訂單創建失敗，請填寫訂單客戶資料欄位', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .put('/api/cart')
            .send('shipping_method=住家宅配')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)

              agent
                .post('/api/order')
                .send(
                  'orderRecipientName=user1&orderRecipientPhone=0912345678&orderRecipientAddress=test'
                )
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                  if (err) return done(err)
                  expect(res.body.status).to.be.equal('error')
                  expect(res.body.message).to.be.equal('請填寫訂單客戶資料欄位')

                  done()
                })
            })
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })
  describe('GET Order - 取得訂單', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Order.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })

      await db.Coupon.create({
        id: 1,
        type: 1,
        coupon_code: '1111',
        limited_num: 1
      })
    })

    it('（O）成功取得訂單資料', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .post('/api/coupon')
            .send('couponCode=1111')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)

              agent
                .put('/api/cart')
                .send('shipping_method=住家宅配')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                  if (err) return done(err)

                  agent
                    .post('/api/order')
                    .send(
                      'orderCustomerName=root&orderCustomerEmail=root@example.com&orderCustomerPhone=0912345678&orderCustomerAddress=test&orderRecipientName=user1&orderRecipientPhone=0912345678&orderRecipientAddress=test'
                    )
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                      if (err) return done(err)
                      // 訂單資訊
                      expect(res.body.orderData.id).to.be.equal(1)
                      expect(res.body.status).to.be.equal('success')

                      agent
                        .get('/api/order')
                        .set('Accept', 'application/json')
                        .expect(200)
                        .end(function (err, res) {
                          if (err) return done(err)
                          expect(res.body.order.id).to.be.equal(1)
                          expect(res.body.status).to.be.equal('success')

                          done()
                        })
                    })
                })
            })
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Order.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })
})
