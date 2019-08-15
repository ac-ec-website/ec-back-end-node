const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')

const app = require('../../../app')
const db = require('../../../models')

describe('#Admin Product', () => {
  describe('GET products', () => {
    before(async function() {
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1' })
      await db.Product.create({ name: 'product2' })
    })

    it('should render products', done => {
      request(app)
        .get('/api/admin/products')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.products.length).to.be.equal(2)
          done()
        })
    })

    it('should render product', done => {
      request(app)
        .get('/api/admin/products/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.product.name).to.be.equal('product1')
          done()
        })
    })

    after(async function() {
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST product', () => {
    before(async function() {
      await db.Product.destroy({ where: {}, truncate: true })
    })

    it('need name exist', done => {
      request(app)
        .post('/api/admin/products')
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
        .post('/api/admin/products')
        .send('name=product1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  describe('PUT product', () => {
    before(async function() {
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({})
    })

    it('need name exist', done => {
      request(app)
        .put('/api/admin/products/1')
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
        .put('/api/admin/products/1')
        .send('name=product1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  describe('DELETE product', () => {
    before(async function() {
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({})
    })

    it('can delete product', done => {
      request(app)
        .delete('/api/admin/products/1')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })
})
