process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Cart Controller', () => {
  describe('GET Cart - 查看購物車內容', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })

      await db.Cart.create({ id: 1, quantity: 100 })
    })

    it('（O）取得單一購物車資料', done => {
      request(app)
        .get('/api/cart')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cart.quantity).to.be.equal(100)
          expect(res.body.status).to.be.equal('success')

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
    })
  })
  describe('POST /api/cart/1/cartItem/1/add - 增加購物車商品數量', () => {
    before(async function() {
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

    it('增加商品數量', done => {
      request(app)
        .post('/api/cart/1/cartItem/1/add')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.cartItem[0].ProductId).to.be.equal(1)
          expect(res.body.cartItem[0].CartId).to.be.equal(1)
          expect(res.body.cartItem[0].id).to.be.equal(1)
          expect(res.body.cartItem[0].quantity).to.be.equal(3)

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST /api/cart  - 新增購物車內的商品', () => {
    beforeEach(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })

    it('req.body 缺少 productId，返回錯誤提示', done => {
      request(app)
        .post('/api/cart')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('req.body 缺少 productId')

          done()
        })
    })
    it('新增購物車成功後，返回成功狀態及 cart、cartItem 物件，productId 和數量正確', done => {
      request(app)
        .post('/api/cart')
        .send({ productId: 23, quantity: 77 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cartItem.CartId).to.be.equal(1)
          expect(res.body.cartItem.ProductId).to.be.equal(23)
          expect(res.body.cartItem.quantity).to.be.equal(77)
          done()
        })
    })
    it('新增 13 個商品，再次新增 17 個商品，購物車商品數量變為 30', done => {
      var agent = request.agent(app)
      agent
        .post('/api/cart')
        .send({ productId: 19, quantity: 13 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cartItem.CartId).to.be.equal(1)
          expect(res.body.cartItem.ProductId).to.be.equal(19)
          expect(res.body.cartItem.quantity).to.be.equal(13)

          agent
            .post('/api/cart')
            .send({ productId: 19, quantity: 17 })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('success')
              expect(res.body.cart.id).to.be.equal(1)
              expect(res.body.cartItem.CartId).to.be.equal(1)
              expect(res.body.cartItem.ProductId).to.be.equal(19)
              expect(res.body.cartItem.quantity).to.be.equal(30)

              done()
            })
        })
    })

    afterEach(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST /api/cart/1/cartItem/1/sub - 減少購物車商品數量', () => {
    before(async function() {
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

    it('減少商品數量', done => {
      request(app)
        .post('/api/cart/1/cartItem/1/sub')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.cartItem[0].ProductId).to.be.equal(1)
          expect(res.body.cartItem[0].CartId).to.be.equal(1)
          expect(res.body.cartItem[0].id).to.be.equal(1)
          expect(res.body.cartItem[0].quantity).to.be.equal(1)

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })
  describe('DELETE /api/cart/1/cartItem/1 - 刪除購物車內的商品', () => {
    before(async function() {
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

    it('刪除購物車內的商品', done => {
      request(app)
        .delete('/api/cart/1/cartItem/1')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.message).to.be.equal('已刪除成功')

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })
})
