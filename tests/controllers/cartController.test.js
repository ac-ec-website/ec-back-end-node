const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Cart Controller', () => {
  // describe('GET /api/products', () => {
  //   before(async function() {
  //     // 在所有測試開始前會執行的程式碼區塊
  //     await db.Product.destroy({ where: {}, truncate: true })

  //     await db.Product.create({ name: 'product1' })
  //     await db.Product.create({ name: 'product2' })
  //   })

  //   it('取得所有產品', done => {
  //     request(app)
  //       .get('/api/products')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end(function(err, res) {
  //         if (err) return done(err)
  //         expect(res.body.products.length).to.be.equal(2)
  //         expect(res.body.products[0].name).to.be.equal('product1')
  //         expect(res.body.products[1].name).to.be.equal('product2')

  //         done()
  //       })
  //   })

  //   after(async function() {
  //     // 在所有測試結束後會執行的程式碼區塊
  //     await db.Product.destroy({ where: {}, truncate: true })
  //   })
  // })

  // describe('GET /api/products/:id', () => {
  //   before(async function() {
  //     // 在所有測試開始前會執行的程式碼區塊
  //     await db.Product.destroy({ where: {}, truncate: true })

  //     await db.Product.create({ name: 'product1' })
  //   })

  //   it('取得特定產品資訊', done => {
  //     request(app)
  //       .get('/api/products/1')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end(function(err, res) {
  //         if (err) return done(err)
  //         expect(res.body.product.id).to.be.equal(1)
  //         expect(res.body.product.name).to.be.equal('product1')

  //         done()
  //       })
  //   })

  //   after(async function() {
  //     // 在所有測試結束後會執行的程式碼區塊
  //     await db.Product.destroy({ where: {}, truncate: true })
  //   })
  // })

  describe('POST /api/cart', () => {
    before(async function() {
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
    it('新增購物車成功後，返回成功狀態及 cart、cartItem 物件，數量為 1', done => {
      request(app)
        .post('/api/cart')
        .send({ productId: 23 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          console.log(res.body)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cartItem.CartId).to.be.equal(1)
          expect(res.body.cartItem.ProductId).to.be.equal(23)
          expect(res.body.cartItem.quantity).to.be.equal(1)
          done()
        })
    })
    it('商品再次新增進購物車，數量變為 2', done => {
      request(app)
        .post('/api/cart')
        .send({ productId: 23 })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          console.log(res.body)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cartItem.CartId).to.be.equal(1)
          expect(res.body.cartItem.ProductId).to.be.equal(23)
          expect(res.body.cartItem.quantity).to.be.equal(2)

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
    })
  })
})
