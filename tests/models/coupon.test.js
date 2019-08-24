var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const CouponModel = require('../../models/coupon')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Coupon Model', () => {
  const Coupon = CouponModel(sequelize, dataTypes)
  const coupon = new Coupon()

  checkModelName(Coupon)('Coupon')

  context('Properties', () => {
    ;['name', 'shipping_free'].forEach(checkPropertyExists(coupon))
  })

  context('Associations', () => {
    const Order = 'Order'

    before(() => {
      Coupon.associate({ Order })
    })

    it('defined a hasMany association with cart', () => {
      expect(Coupon.hasMany).to.have.been.calledWith(Order)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Coupon.create({}).then(coupon => {
        data = coupon
        done()
      })
    })
    it('read', done => {
      db.Coupon.findByPk(data.id).then(coupon => {
        expect(data.id).to.be.equal(coupon.id)
        done()
      })
    })
    it('update', done => {
      db.Coupon.update({}, { where: { id: data.id } }).then(() => {
        db.Coupon.findByPk(data.id).then(coupon => {
          expect(data.updatedAt).to.be.not.equal(coupon.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Coupon.destroy({ where: { id: data.id } }).then(() => {
        db.Coupon.findByPk(data.id).then(coupon => {
          expect(coupon).to.be.equal(null)
          done()
        })
      })
    })
  })
})
