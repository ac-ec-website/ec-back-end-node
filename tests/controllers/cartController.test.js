/* eslint-env mocha */
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Cart Controller', () => {
  describe('GET Cart - 查看購物車內容', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.Discount.destroy({ where: {}, truncate: true })
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ id: 1, sell_price: 550, stock_quantity: 20 })
      await db.Product.create({ id: 2, sell_price: 350, stock_quantity: 20 })
      await db.Discount.create({
        id: 1,
        type: 1,
        target_price: 500,
        percent: null,
        product_reduce: 30,
        shipping_free: null,
        start_date: '2019-09-01T00:00:00.000Z',
        end_date: '2020-10-20T13:00:00.000Z'
      })
    })

    it('（Ｏ）取得單一購物車資料', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1, quantity: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .get('/api/cart')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.cart.id).to.be.equal(1)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    it('（Ｘ）無法取得單一購物車資料', done => {
      var agent = request.agent(app)
      agent
        .get('/api/cart')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')

          done()
        })
    })

    it('（Ｏ）取得單一購物車資料，而且適用特價活動', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1, quantity: 3 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .get('/api/cart')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.cart.id).to.be.equal(2)
              expect(res.body.discountData.product_reduce).to.be.equal(30)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    it('（Ｏ）取得單一購物車資料，但不適用特價活動', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 2, quantity: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          agent
            .get('/api/cart')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.cart.id).to.be.equal(3)
              expect(res.body.discountData.id).to.be.equal(undefined)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Discount.destroy({ where: {}, truncate: true })
    })
  })
  describe('PUT Cart - 更新購物車的配送資訊', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1', sell_price: 500 })
    })

    it('（Ｏ）成功更新購物車的配送資訊 - 住家宅配', done => {
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
              expect(res.body.cart.id).to.be.equal(1)
              expect(res.body.cart.shipping_method).to.be.equal('住家宅配')
              expect(res.body.cart.shipping_fee).to.be.equal(60)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    it('（Ｏ）成功更新購物車的配送資訊 - 其他', done => {
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
            .send('shipping_method=其他')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.cart.id).to.be.equal(2)
              expect(res.body.cart.shipping_method).to.be.equal('其他')
              expect(res.body.cart.shipping_fee).to.be.equal(100)
              expect(res.body.status).to.be.equal('success')

              done()
            })
        })
    })

    it('（Ｘ）無法更新購物車的配送資訊', done => {
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
            .send('')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('error')
              expect(res.body.message).to.be.equal('請填寫配送方式')

              done()
            })
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })
  describe('POST /api/cart/1/cartItem/1/add - 增加購物車商品數量', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })

      await db.Product.create({ id: 1, sell_price: 500 })
      await db.Cart.create({ id: 1 })
      await db.CartItem.create({
        id: 1,
        quantity: 2,
        CartId: 1,
        ProductId: 1
      })
    })

    it('（Ｏ）成功增加商品數量', done => {
      request(app)
        .post('/api/cart/1/cartItem/1/add')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.cartItem[0].ProductId).to.be.equal(1)
          expect(res.body.cartItem[0].CartId).to.be.equal(1)
          expect(res.body.cartItem[0].id).to.be.equal(1)
          expect(res.body.cartItem[0].quantity).to.be.equal(3)

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })
  describe('POST /api/cart  - 新增購物車內的商品', () => {
    beforeEach(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ sell_price: 500, stock_quantity: 100 })
    })

    it('req.body 缺少 productId，返回錯誤提示', done => {
      request(app)
        .post('/api/cart')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('req.body 缺少 productId')

          done()
        })
    })

    it('新增購物車成功後，返回成功狀態及 cart、cartItem 物件，productId 和數量正確', done => {
      request(app)
        .post('/api/cart')
        .send({ productId: 1, quantity: 1 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cartItem.CartId).to.be.equal(1)
          expect(res.body.cartItem.ProductId).to.be.equal(1)
          expect(res.body.cartItem.quantity).to.be.equal(1)
          expect(res.body.product.stock_quantity).to.be.equal(99)
          done()
        })
    })
    it('新增 13 個商品，再次新增 17 個商品，購物車商品數量變為 30', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 1, quantity: 13 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cartItem.CartId).to.be.equal(1)
          expect(res.body.cartItem.ProductId).to.be.equal(1)
          expect(res.body.cartItem.quantity).to.be.equal(13)
          expect(res.body.product.stock_quantity).to.be.equal(87)

          agent
            .post('/api/cart')
            .send({ productId: 1, quantity: 17 })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('success')
              expect(res.body.cart.id).to.be.equal(1)
              expect(res.body.cartItem.CartId).to.be.equal(1)
              expect(res.body.cartItem.ProductId).to.be.equal(1)
              expect(res.body.cartItem.quantity).to.be.equal(30)
              expect(res.body.product.stock_quantity).to.be.equal(70)

              done()
            })
        })
    })

    afterEach(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })
  describe('POST /api/cart/1/cartItem/1/sub - 減少購物車商品數量', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })

      await db.Product.create({ id: 1 })
      await db.Cart.create({ id: 1 })
      await db.CartItem.create({
        id: 1,
        quantity: 2,
        CartId: 1,
        ProductId: 1
      })
    })

    it('（Ｏ）減少商品數量', done => {
      request(app)
        .post('/api/cart/1/cartItem/1/sub')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.cartItem[0].ProductId).to.be.equal(1)
          expect(res.body.cartItem[0].CartId).to.be.equal(1)
          expect(res.body.cartItem[0].id).to.be.equal(1)
          expect(res.body.cartItem[0].quantity).to.be.equal(1)

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })
  describe('DELETE /api/cart/1/cartItem/1 - 刪除購物車內的商品', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })

      await db.Product.create({ id: 1 })
      await db.Cart.create({ id: 1 })
      await db.CartItem.create({
        id: 1,
        quantity: 2,
        CartId: 1,
        ProductId: 1
      })
    })

    it('（Ｏ）刪除購物車內的商品', done => {
      request(app)
        .delete('/api/cart/1/cartItem/1')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.message).to.be.equal('商品已刪除成功')

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })
})
