var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const DiscountModel = require('../../models/discount')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Discount Model', () => {
  const Discount = DiscountModel(sequelize, dataTypes)
  const discount = new Discount()

  checkModelName(Discount)('Discount')

  context('Properties', () => {
    ;['name', 'shipping_free'].forEach(checkPropertyExists(discount))
  })

  context('Associations', () => {
    const Order = 'Order'

    before(() => {
      Discount.associate({ Order })
    })

    it('defined a hasMany association with cart', () => {
      expect(Discount.hasMany).to.have.been.calledWith(Order)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Discount.create({}).then(discount => {
        data = discount
        done()
      })
    })
    it('read', done => {
      db.Discount.findByPk(data.id).then(discount => {
        expect(data.id).to.be.equal(discount.id)
        done()
      })
    })
    it('update', done => {
      db.Discount.update({}, { where: { id: data.id } }).then(() => {
        db.Discount.findByPk(data.id).then(discount => {
          expect(data.updatedAt).to.be.not.equal(discount.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Discount.destroy({ where: { id: data.id } }).then(() => {
        db.Discount.findByPk(data.id).then(discount => {
          expect(discount).to.be.equal(null)
          done()
        })
      })
    })
  })
})
