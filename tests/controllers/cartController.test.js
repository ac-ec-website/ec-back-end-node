const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Cart Controller', () => {
  describe('POST /api/cart', () => {
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
})
