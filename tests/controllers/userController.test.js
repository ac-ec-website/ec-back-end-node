process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#User Controller', () => {
  describe('GET CurrentUser', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.User.destroy({ where: {}, truncate: true })
    })

    it('取得使用者資料', done => {
      request(app)
        .get('/api/get_current_user')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)

          expect(res.body.user.id).to.be.equal(1)
          expect(res.body.status).to.be.equal('success')

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.User.destroy({ where: {}, truncate: true })
    })
  })
})
