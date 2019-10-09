const request = require('supertest')
const { expect } = require('chai')
const sinon = require('sinon')
const stubForTest = require('../../config/stubForTest')
const app = require('../../app')
const db = require('../../models')

describe('#Product Controller', () => {
  describe('GET /api/products', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1' })
      await db.Product.create({ name: 'product2' })
    })

    it('取得所有產品', done => {
      request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.products.length).to.be.equal(2)
          expect(res.body.products[0].name).to.be.equal('product1')
          expect(res.body.products[1].name).to.be.equal('product2')

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  describe('GET /api/products with cartId', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      sinon.stub(stubForTest, 'stubSession').callsFake((req, res, next) => {
        req.session.cartId = 1
        req.session.save()

        return next()
      })

      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1' })
      await db.Product.create({ name: 'product2' })
      await db.Cart.create({ id: 1 })
    })

    it('取得所有產品及購物車', done => {
      request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.products.length).to.be.equal(2)
          expect(res.body.products[0].name).to.be.equal('product1')
          expect(res.body.products[1].name).to.be.equal('product2')
          expect(res.body.cart.id).to.be.equal(1)

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      stubForTest.stubSession.restore()
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
    })
  })

  describe('GET /api/products/:id', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1' })
    })

    it('取得特定產品資訊', done => {
      request(app)
        .get('/api/products/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.body.product.id).to.be.equal(1)
          expect(res.body.product.name).to.be.equal('product1')

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  describe('GET /api/products/:id with cartId', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      sinon.stub(stubForTest, 'stubSession').callsFake((req, res, next) => {
        req.session.cartId = 1
        req.session.save()

        return next()
      })
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1' })
      await db.Cart.create({ id: 1 })
    })

    it('取得特定產品資訊', done => {
      request(app)
        .get('/api/products/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.body.product.id).to.be.equal(1)
          expect(res.body.product.name).to.be.equal('product1')
          expect(res.body.cart.id).to.be.equal(1)

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      stubForTest.stubSession.restore()
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
    })
  })
})
