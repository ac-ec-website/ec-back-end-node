const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')

const app = require('../../../app')
const db = require('../../../models')

describe('#Admin Discount', () => {
  describe('GET Discounts', () => {
    before(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })

      await db.Discount.create({ name: 'Discount1' })
      await db.Discount.create({ name: 'Discount2' })
    })

    it('should render discounts', done => {
      request(app)
        .get('/api/admin/discounts')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.discounts.length).to.be.equal(2)
          done()
        })
    })

    it('should render discount', done => {
      request(app)
        .get('/api/admin/discounts/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.discount.name).to.be.equal('Discount1')
          done()
        })
    })

    after(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST Discount', () => {
    before(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })
    })

    it('need name exist', done => {
      request(app)
        .post('/api/admin/discounts')
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
        .post('/api/admin/discounts')
        .send('name=Discount1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })
    })
  })

  describe('PUT Discount', () => {
    before(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })

      await db.Discount.create({})
    })

    it('need shipping_free exist', done => {
      request(app)
        .put('/api/admin/discounts/1')
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
        .put('/api/admin/discounts/1')
        .send('name=Discount1&shipping_free=1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })
    })
  })

  describe('DELETE Discount', () => {
    before(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })

      await db.Discount.create({})
    })

    it('can delete discount', done => {
      request(app)
        .delete('/api/admin/discounts/1')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Discount.destroy({ where: {}, truncate: true })
    })
  })
})
