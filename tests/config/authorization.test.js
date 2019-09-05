process.env.NODE_ENV = 'test'

const request = require('supertest')
const { expect } = require('chai')
const sinon = require('sinon')
const authorization = require('../../config/authorization')
const app = require('../../app')
const db = require('../../models')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

describe('#Authorization', () => {
  describe('Check user is login', () => {
    before(async function() {
      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({
        email: 'root@example.com',
        password: bcrypt.hashSync('12345678', salt)
      })
    })

    it('Request headers 有設定 JWT token', done => {
      var agent = request.agent(app)
      agent
        .post('/api/admin/signin')
        .send({ email: 'root@example.com', password: '12345678' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          const token = res.body.token

          agent
            .get('/api/get_current_user')
            .set('authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err)
              expect(res.body.user.email).to.be.equal('root@example.com')

              done()
            })
        })
    })

    it('Request headers 未設定 JWT token', done => {
      var agent = request.agent(app)
      agent
        .post('/api/admin/signin')
        .send({ email: 'root@example.com', password: '12345678' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          const token = res.body.token

          agent
            .get('/api/get_current_user')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('forbidden')
              expect(res.body.message).to.be.equal('headers 未設定 JWT token')

              done()
            })
        })
    })

    it('Request headers 的 JWT token 錯誤', done => {
      var agent = request.agent(app)
      agent
        .post('/api/admin/signin')
        .send({ email: 'root@example.com', password: '12345678' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          const token = res.body.token

          agent
            .get('/api/get_current_user')
            .set('authorization', `Bearer 123`)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err)
              expect(res.body.status).to.be.equal('forbidden')
              expect(res.body.message).to.be.equal(
                '錯誤的 JWT token 或 token 已過期，請重新登入取得新簽發的 JWT token'
              )

              done()
            })
        })
    })

    after(async function() {
      await db.User.destroy({ where: {}, truncate: true })
    })
  })

  describe('Check user role is Admin', () => {
    before(async function() {
      sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
        req.user = { role: 'admin' }
        return next()
      })
      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({ name: 'Tom' })
    })

    it('When user login and the role is admin, user can see the data', done => {
      request(app)
        .get('/api/admin/users')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.user[0].name).to.be.equal('Tom')

          done()
        })
    })

    after(async function() {
      authorization.checkIsLogin.restore()
      await db.User.destroy({ where: {}, truncate: true })
    })
  })

  describe('Check user role is not Admin', () => {
    before(async function() {
      sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
        req.user = { role: 'user' }
        return next()
      })
      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({ name: 'Tom' })
    })

    it('When user login and the role is not admin, forbid user', done => {
      request(app)
        .get('/api/admin/users')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('訪問權限不夠')

          done()
        })
    })

    after(async function() {
      authorization.checkIsLogin.restore()
      await db.User.destroy({ where: {}, truncate: true })
    })
  })

  describe('req.user 沒有資料', () => {
    before(async function() {
      sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
        return next()
      })
      await db.User.destroy({ where: {}, truncate: true })
    })

    it('When user login and has no req.user data, forbid user', done => {
      request(app)
        .get('/api/admin/users')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('請重新登入')

          done()
        })
    })

    after(async function() {
      authorization.checkIsLogin.restore()
      await db.User.destroy({ where: {}, truncate: true })
    })
  })
})
