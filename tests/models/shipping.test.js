const chai = require('chai')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const db = require('../../models')
const ShippingModel = require('../../models/shipping')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Shipping Model ', () => {
  const Shipping = ShippingModel(sequelize, dataTypes)
  const shipping = new Shipping()

  checkModelName(Shipping)('Shipping')

  context('Properties', () => {
    ;['sn', 'shipping_status'].forEach(checkPropertyExists(shipping))
  })

  context('Associations', () => {
    const Order = 'Order'

    before(() => {
      Shipping.associate({ Order })
    })

    it('defined a belongsTo association with Order', () => {
      expect(Shipping.belongsTo).to.have.been.calledWith(Order)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Shipping.create({}).then(shipping => {
        data = shipping
        done()
      })
    })
    it('read', done => {
      db.Shipping.findByPk(data.id).then(shipping => {
        expect(data.id).to.be.equal(shipping.id)
        done()
      })
    })
    it('update', done => {
      db.Shipping.update({}, { where: { id: data.id } }).then(() => {
        db.Shipping.findByPk(data.id).then(shipping => {
          expect(data.updatedAt).to.be.not.equal(shipping.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Shipping.destroy({ where: { id: data.id } }).then(() => {
        db.Shipping.findByPk(data.id).then(shipping => {
          expect(shipping).to.be.equal(null)
          done()
        })
      })
    })
  })
})
