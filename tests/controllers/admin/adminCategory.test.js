const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')
const authorization = require('../../../config/authorization')

authorization.checkIsLogin = sinon
  .stub(authorization, 'checkIsLogin')
  .callsFake(function(req, res, next) {
    req.user = {
      id: 1,
      name: 'root'
    }
    return next()
  })
authorization.checkIsAdmin = sinon
  .stub(authorization, 'checkIsAdmin')
  .callsFake(function(req, res, next) {
    return next()
  })

let app = require('../../../app')
const db = require('../../../models')

describe('#Admin Category', () => {
  describe('GET Categories', () => {
    before(async function() {
      await db.Category.destroy({ where: {}, truncate: true })

      await db.Category.create({ name: 'category1' })
      await db.Category.create({ name: 'category2' })
    })

    it('should render categories', done => {
      request(app)
        .get('/api/admin/categories')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.categories.length).to.be.equal(2)
          done()
        })
    })

    it('should render category', done => {
      request(app)
        .get('/api/admin/categories/1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.category.name).to.be.equal('category1')
          done()
        })
    })

    after(async function() {
      await db.Category.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST Category', () => {
    before(async function() {
      await db.Category.destroy({ where: {}, truncate: true })
    })

    it('need name exist', done => {
      request(app)
        .post('/api/admin/categories')
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
        .post('/api/admin/categories')
        .send('name=category1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Category.destroy({ where: {}, truncate: true })
    })
  })

  describe('PUT Category', () => {
    before(async function() {
      await db.Category.destroy({ where: {}, truncate: true })

      await db.Category.create({})
    })

    it('need name exist', done => {
      request(app)
        .put('/api/admin/categories/1')
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
        .put('/api/admin/categories/1')
        .send('name=category1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Category.destroy({ where: {}, truncate: true })
    })
  })

  describe('DELETE Category', () => {
    before(async function() {
      await db.Category.destroy({ where: {}, truncate: true })

      await db.Category.create({})
    })

    it('can delete category', done => {
      request(app)
        .delete('/api/admin/categories/1')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.status).to.be.equal('success')
          done()
        })
    })

    after(async function() {
      await db.Category.destroy({ where: {}, truncate: true })
    })
  })
})
