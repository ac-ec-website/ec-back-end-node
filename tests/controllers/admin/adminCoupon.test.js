const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')

const app = require('../../../app')
const db = require('../../../models')

describe('#Admin Coupon', () => {
  describe('GET Coupons', () => {
    before(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })

      await db.Coupon.create({ name: 'Coupon1' })
      await db.Coupon.create({ name: 'Coupon2' })
    })

    it('should render coupons', done => {
      request(app)
        .get('/api/admin/coupons')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.coupons.length).to.be.equal(2)
          done()
        })
    })

    it('should render coupon', done => {
      request(app)
        .get('/api/admin/coupons/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.coupon.name).to.be.equal('Coupon1')
          done()
        })
    })

    after(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST Coupon', () => {
    before(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })
    })

    it('need name exist', done => {
      request(app)
        .post('/api/admin/coupons')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          done()
        })
    })

    it('successfully create', done => {
      request(app)
        .post('/api/admin/coupons')
        .send('name=Coupon1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })

  describe('PUT Coupon', () => {
    before(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })

      await db.Coupon.create({})
    })

    it('need shipping_free exist', done => {
      request(app)
        .put('/api/admin/coupons/1')
        .send('')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('error')
          done()
        })
    })

    it('successfully update', done => {
      request(app)
        .put('/api/admin/coupons/1')
        .send('name=Coupon1&shipping_free=1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })

  describe('DELETE Coupon', () => {
    before(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })

      await db.Coupon.create({})
    })

    it('can delete coupon', done => {
      request(app)
        .delete('/api/admin/coupons/1')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Coupon.destroy({ where: {}, truncate: true })
    })
  })
})
