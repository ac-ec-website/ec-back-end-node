var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const PaymentModel = require('../../models/payment')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Payment Model ', () => {
  const Payment = PaymentModel(sequelize, dataTypes)
  const payment = new Payment()

  checkModelName(Payment)('Payment')

  context('Properties', () => {
    ;['sn', 'total_amount'].forEach(checkPropertyExists(payment))
  })

  context('Associations', () => {
    const Order = 'Order'

    before(() => {
      Payment.associate({ Order })
    })

    it('defined a belongsTo association with Order', () => {
      expect(Payment.belongsTo).to.have.been.calledWith(Order)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Payment.create({}).then(payment => {
        data = payment
        done()
      })
    })
    it('read', done => {
      db.Payment.findByPk(data.id).then(payment => {
        expect(data.id).to.be.equal(payment.id)
        done()
      })
    })
    it('update', done => {
      db.Payment.update({}, { where: { id: data.id } }).then(() => {
        db.Payment.findByPk(data.id).then(payment => {
          expect(data.updatedAt).to.be.not.equal(payment.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Payment.destroy({ where: { id: data.id } }).then(() => {
        db.Payment.findByPk(data.id).then(payment => {
          expect(payment).to.be.equal(null)
          done()
        })
      })
    })
  })
})
