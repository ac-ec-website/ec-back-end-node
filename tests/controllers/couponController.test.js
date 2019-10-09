const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Coupon Controller', () => {
  describe('GET Coupon - 查看優惠券內容', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Coupon.destroy({ where: {}, truncate: true })
      await db.Coupon.create({
        id: 1,
        type: 1,
        coupon_code: '1111',
        limited_num: 10
      })
    })

    it('（Ｏ）取得優惠券內容', done => {
      var agent = request.agent(app)
      agent
        .post('/api/coupon')
        .send('couponCode=1111')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .get('/api/coupon')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.couponData.id).to.be.equal(1)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    it('（Ｘ）無法取得優惠券內容 - couponCode 為 空值 ', done => {
      var agent = request.agent(app)
      agent
        .post('/api/coupon')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .get('/api/coupon')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('error')

              done()
            })
        })
    })

    it('（Ｘ）無法取得優惠券內容 - couponCode 為 undefined ', done => {
      var agent = request.agent(app)
      agent
        .post('/api/coupon')
        .send('couponCode=undefined')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .get('/api/coupon')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('error')

              done()
            })
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })
  describe('POST /api/coupon - 使用優惠券', () => {
    beforeEach(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Coupon.destroy({ where: {}, truncate: true })

      await db.Coupon.create({
        id: 1,
        type: 1,
        coupon_code: '1111',
        limited_num: 2
      })
    })

    it('（Ｏ）成功使用優惠券', done => {
      var agent = request.agent(app)
      agent
        .post('/api/coupon')
        .send('couponCode=1111')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.body.couponData.limited_num).to.be.equal(1)
          expect(res.body.status).to.be.equal('success')

          done()
        })
      // })
    })

    it('（Ｘ）優惠券無法使用 - 數量不足 ', done => {
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
                .post('/api/coupon')
                .send('couponCode=1111')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                  if (err) return done(err)
                  expect(res.body.status).to.be.equal('error-cantBeUsed')

                  done()
                })
            })
        })
    })

    it('（Ｘ）優惠券無法使用 - couponCode 為 空值 ', done => {
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
            .send('couponCode=')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('error')

              done()
            })
        })
    })

    it('（Ｘ）查無此優惠券 ', done => {
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
            .send('couponCode=1112')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('error-notFound')

              done()
            })
        })
    })

    afterEach(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })
  describe('DELETE /api/coupon - 取消使用優惠券', () => {
    beforeEach(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Coupon.destroy({ where: {}, truncate: true })

      await db.Coupon.create({
        id: 1,
        type: 1,
        coupon_code: '1111',
        limited_num: 2
      })
    })

    it('（Ｏ）取消使用優惠券', done => {
      var agent = request.agent(app)

      agent
        .post('/api/coupon')
        .send('couponCode=1111')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .delete('/api/coupon')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)

              expect(res.body.couponData.limited_num).to.be.equal(2)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    it('（Ｘ）優惠券無法取消使用 - couponCode 為 空值 ', done => {
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
            .send('couponCode=')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)

              agent
                .delete('/api/coupon')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                  if (err) return done(err)
                  expect(res.body.status).to.be.equal('error')

                  done()
                })
            })
        })
    })

    afterEach(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })
})
