process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Cart Controller', () => {
  describe('GET /api/cart/1', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })

      await db.Cart.create({ id: 1, quantity: 100 })
    })

    it('取得單一購物車資料', done => {
      request(app)
        .get('/api/cart/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.cart.id).to.be.equal(1)
          expect(res.body.cart.quantity).to.be.equal(100)

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Cart.destroy({ where: {}, truncate: true })
    })
  })
})
