process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Order Controller', () => {
  describe('POST Order - 新增訂單', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Order.destroy({ where: {}, truncate: true })
    })

    // ::TODO:: 測試碼待更新
    it('（O）成功創建一筆訂單', done => {
      request(app)
        .post('/api/order')
        .send(
          'orderCustomerName=root&orderCustomerEmail=123@gmail.com&orderCustomerPhone=123&orderCustomerAddress=test'
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
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
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })
})
