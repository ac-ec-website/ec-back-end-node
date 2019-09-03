const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')
const bcrypt = require('bcrypt')
const authorization = require('../../../config/authorization')
const app = require('../../../app')
const db = require('../../../models')

describe('#AdminController', () => {
  describe('後台註冊 POST /api/admin/signup', () => {
    before(async function() {
      await db.User.destroy({ where: {}, truncate: true })
      await db.User.create({ email: 'user23@example.com' })
    })

    it('所有欄位必填', done => {
      request(app)
        .post('/api/admin/signup')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('所有欄位都要填寫')
          done()
        })
    })

    it('兩次密碼一致', done => {
      request(app)
        .post('/api/admin/signup')
        .send({
          name: 'user',
          email: 'user@example.com',
          password: '12345678',
          passwordCheck: '1234567'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('兩次密碼輸入不同！')
          done()
        })
    })

    it('信箱不能重複', done => {
      request(app)
        .post('/api/admin/signup')
        .send({
          name: 'user',
          email: 'user23@example.com',
          password: '12345678',
          passwordCheck: '12345678'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('信箱重複！')
          done()
        })
    })

    it('註冊成功返回用戶', done => {
      request(app)
        .post('/api/admin/signup')
        .send({
          name: 'user17',
          email: 'user17@example.com',
          password: '12345678',
          passwordCheck: '12345678'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.message).to.be.equal('成功註冊帳號！')
          expect(res.body.user.name).to.be.equal('user17')
          done()
        })
    })

    after(async function() {
      await db.User.destroy({ where: {}, truncate: true })
    })
  })

  describe('後台登入 POST /api/admin/signin', () => {
    before(async function() {
      await db.User.destroy({ where: {}, truncate: true })
      const salt = bcrypt.genSaltSync(10)
      await db.User.create({
        email: 'user@example.com',
        password: bcrypt.hashSync('12345678', salt)
      })
    })

    it('所有欄位必填', done => {
      request(app)
        .post('/api/admin/signin')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('所有欄位都要填寫')
          done()
        })
    })

    it('檢驗帳號', done => {
      request(app)
        .post('/api/admin/signin')
        .send({
          email: 'user13@example.com',
          password: '12345678'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('帳號錯誤')
          done()
        })
    })

    it('檢驗密碼', done => {
      request(app)
        .post('/api/admin/signin')
        .send({
          email: 'user@example.com',
          password: '123'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('密碼錯誤')
          done()
        })
    })

    it('登入成功，簽發 JWT Token', done => {
      request(app)
        .post('/api/admin/signin')
        .send({ email: 'user@example.com', password: '12345678' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          expect(res.body.message).to.be.equal('ok')
          expect(res.body.token.length).to.be.above(0)
          done()
        })
    })

    after(async function() {
      await db.User.destroy({ where: {}, truncate: true })
    })
  })

  describe('更改使用者權限 PUT /api/admin/user', () => {
    before(async function() {
      sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
        return next()
      })
      sinon.stub(authorization, 'checkIsAdmin').callsFake((req, res, next) => {
        return next()
      })
      await db.User.destroy({ where: {}, truncate: true })

      const salt = bcrypt.genSaltSync(10)
      await db.User.create({
        id: 1,
        role: 'user'
      })
    })

    it('所有欄位必填', done => {
      request(app)
        .put('/api/admin/user')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          expect(res.body.message).to.be.equal('Cannot find id and role')
          done()
        })
    })

    it('成功修改使用者權限', done => {
      request(app)
        .put('/api/admin/user')
        .send({
          id: 1,
          role: 'admin'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.user.id).to.be.equal(1)
          expect(res.body.user.role).to.be.equal('admin')
          done()
        })
    })

    after(async function() {
      authorization.checkIsLogin.restore()
      authorization.checkIsAdmin.restore()
      await db.User.destroy({ where: {}, truncate: true })
    })
  })
})
