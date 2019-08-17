var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const CartModel = require('../../models/cart')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Cart Model', () => {
  const Cart = CartModel(sequelize, dataTypes)
  const cart = new Cart()

  checkModelName(Cart)('Cart')

  context('Properties', () => {
    ;['quantity'].forEach(checkPropertyExists(cart))
  })

  context('Associations', () => {
    const Product = 'Product'

    before(() => {
      Cart.associate({ Product })
    })

    it('defined a belongsToMany association with product', () => {
      expect(Cart.belongsToMany).to.have.been.calledWith(Product)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Cart.create({}).then(cart => {
        data = cart
        done()
      })
    })
    it('read', done => {
      db.Cart.findByPk(data.id).then(cart => {
        expect(data.id).to.be.equal(cart.id)
        done()
      })
    })
    it('update', done => {
      db.Cart.update({}, { where: { id: data.id } }).then(() => {
        db.Cart.findByPk(data.id).then(cart => {
          expect(data.updatedAt).to.be.not.equal(cart.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Cart.destroy({ where: { id: data.id } }).then(() => {
        db.Cart.findByPk(data.id).then(cart => {
          expect(cart).to.be.equal(null)
          done()
        })
      })
    })
  })
})
