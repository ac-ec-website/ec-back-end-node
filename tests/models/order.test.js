var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const OrderModel = require('../../models/order')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Order Model ', () => {
  const Order = OrderModel(sequelize, dataTypes)
  const order = new Order()

  checkModelName(Order)('Order')

  context('Properties', () => {
    ;['sn', 'total_amount'].forEach(checkPropertyExists(order))
  })

  context('Associations', () => {
    const User = 'User'
    const Product = 'Product'
    const Payment = 'Payment'

    before(() => {
      Order.associate({ User })
      Order.associate({ Product })
      Order.associate({ Payment })
    })

    it('defined a belongsTo association with user', () => {
      expect(Order.belongsTo).to.have.been.calledWith(User)
    })
    it('defined a belongsToMany association with product', () => {
      expect(Order.belongsToMany).to.have.been.calledWith(Product)
    })
    it('defined a hasMany association with payment', () => {
      expect(Order.hasMany).to.have.been.calledWith(Payment)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Order.create({}).then(order => {
        data = order
        done()
      })
    })
    it('read', done => {
      db.Order.findByPk(data.id).then(order => {
        expect(data.id).to.be.equal(order.id)
        done()
      })
    })
    it('update', done => {
      db.Order.update({}, { where: { id: data.id } }).then(() => {
        db.Order.findByPk(data.id).then(order => {
          expect(data.updatedAt).to.be.not.equal(order.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Order.destroy({ where: { id: data.id } }).then(() => {
        db.Order.findByPk(data.id).then(order => {
          expect(order).to.be.equal(null)
          done()
        })
      })
    })
  })
})
