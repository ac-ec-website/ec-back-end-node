/* eslint-env mocha */
process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')
const sinon = require('sinon')
const authorization = require('../../config/authorization')
const app = require('../../app')
const db = require('../../models')

describe('#User Controller', () => {
  describe('No user data', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
        return next()
      })
      await db.User.destroy({ where: {}, truncate: true })
    })

    it('No user data，取得使用者資料', done => {
      request(app)
        .get('/api/get_current_user')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('forbidden')

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      authorization.checkIsLogin.restore()
      await db.User.destroy({ where: {}, truncate: true })
    })
  })

  describe('Login and get CurrentUser', () => {
    before(async function () {
      // 在所有測試開始前會執行的程式碼區塊
      sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
        req.user = { id: 1 }
        return next()
      })
      await db.User.destroy({ where: {}, truncate: true })
    })

    it('登入成功後，取得使用者資料', done => {
      request(app)
        .get('/api/get_current_user')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.user.id).to.be.equal(1)

          done()
        })
    })

    after(async function () {
      // 在所有測試結束後會執行的程式碼區塊
      authorization.checkIsLogin.restore()
      await db.User.destroy({ where: {}, truncate: true })
    })
  })
})
