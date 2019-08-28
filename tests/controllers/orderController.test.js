process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Order Controller', () => {
  describe('POST Order - 新增訂單', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })

      // 1. 建立產品
      await db.Product.create({ id: 1, name: 'product1' })
      await db.Product.create({ id: 2, name: 'product2' })
      await db.Product.create({ id: 3, name: 'product3' })

      // 2. 建立購物車
      await db.Cart.create({ id: 1 })

      // 3. 建立購物車商品
      await db.CartItem.create({ id: 1, quantity: 100, cartId: 1, ProductId: 1 })
      await db.CartItem.create({ id: 2, quantity: 100, cartId: 1, ProductId: 2 })
    })

    it('（O）成功創建一筆訂單', done => {
      request(app)
        .post('/api/order')
        .send(
          'orderCustomerName=root&orderCustomerEmail=root@example.com&orderCustomerPhone=0912345678&orderCustomerAddress=test'
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.orderData.name).to.be.equal('root')
          expect(res.body.orderData.email).to.be.equal('root@example.com')
          expect(res.body.orderData.phone).to.be.equal('0912345678')
          expect(res.body.orderData.address).to.be.equal('test')
          expect(res.body.status).to.be.equal('success')

          done()
        })
    })

    it('（X）訂單創建失敗，資料未完整填寫', done => {
      request(app)
        .post('/api/order')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('請填寫所有的欄位')

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
      await db.Cart.destroy({ where: {}, truncate: true })
      await db.CartItem.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })
  describe('GET Order - 取得訂單', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Order.create({ id: 1, sn: 3, total_amount: 500 })
    })

    // ::TODO:: 測試碼待更新
    it('（O）成功取得訂單資料', done => {
      request(app)
        .get('/api/order')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.order.id).to.be.equal(1)
          expect(res.body.order.sn).to.be.equal(3)
          expect(res.body.order.total_amount).to.be.equal(500)
          expect(res.body.status).to.be.equal('success')

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })
})
