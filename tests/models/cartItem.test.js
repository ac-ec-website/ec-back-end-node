var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const CartItemModel = require('../../models/cartitem')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# CartItem Model', () => {
  const CartItem = CartItemModel(sequelize, dataTypes)
  const cartItem = new CartItem()

  checkModelName(CartItem)('CartItem')

  context('Properties', () => {
    ;['quantity', 'CartId', 'ProductId'].forEach(checkPropertyExists(cartItem))
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.CartItem.create({}).then(cartItem => {
        data = cartItem
        done()
      })
    })
    it('read', done => {
      db.CartItem.findByPk(data.id).then(cartItem => {
        expect(data.id).to.be.equal(cartItem.id)
        done()
      })
    })
    it('update', done => {
      db.CartItem.update({}, { where: { id: data.id } }).then(() => {
        db.CartItem.findByPk(data.id).then(cartItem => {
          expect(data.updatedAt).to.be.not.equal(cartItem.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.CartItem.destroy({ where: { id: data.id } }).then(() => {
        db.CartItem.findByPk(data.id).then(cartItem => {
          expect(cartItem).to.be.equal(null)
          done()
        })
      })
    })
  })
})
