const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')
const authorization = require('../../../config/authorization')
const app = require('../../../app')
const db = require('../../../models')

describe('#Admin Order', () => {
  before(async () => {
    sinon.stub(authorization, 'checkIsLogin').callsFake((req, res, next) => {
      return next()
    })
    sinon.stub(authorization, 'checkIsAdmin').callsFake((req, res, next) => {
      return next()
    })
  })

  describe('GET orders', () => {
    before(async function () {
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Order.create({ name: 'order1' })
      await db.Order.create({ name: 'order2' })
    })

    it('should render orders', done => {
      request(app)
        .get('/api/admin/orders')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.orders.length).to.be.equal(2)
          done()
        })
    })

    it('should render order', done => {
      request(app)
        .get('/api/admin/orders/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.order.name).to.be.equal('order1')
          done()
        })
    })

    after(async function () {
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })

  describe('PUT order', () => {
    before(async function () {
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Order.create({})
    })

    it('status name exist', done => {
      request(app)
        .put('/api/admin/orders/1')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          done()
        })
    })

    it('successfully update', done => {
      request(app)
        .put('/api/admin/orders/1')
        .send('shipping_status=1&payment_status=1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function () {
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  after(async () => {
    authorization.checkIsLogin.restore()
    authorization.checkIsAdmin.restore()
  })
})
