const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')

const app = require('../../../app')
const db = require('../../../models')

describe('#AdminController', () => {
  describe('後台註冊 POST /api/admin/singup', () => {
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
})
