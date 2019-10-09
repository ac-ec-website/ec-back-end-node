const { expect } = require('chai')
const db = require('../../models')
const OrderItemModel = require('../../models/orderitem')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# OrderItem Model', () => {
  const OrderItem = OrderItemModel(sequelize, dataTypes)
  const orderItem = new OrderItem()

  checkModelName(OrderItem)('OrderItem')

  context('properties', () => {
    ;['price', 'quantity'].forEach(checkPropertyExists(orderItem))
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.OrderItem.create({}).then(orderItem => {
        data = orderItem
        done()
      })
    })
    it('read', done => {
      db.OrderItem.findByPk(data.id).then(orderItem => {
        expect(data.id).to.be.equal(orderItem.id)
        done()
      })
    })
    it('update', done => {
      db.OrderItem.update({}, { where: { id: data.id } }).then(() => {
        db.OrderItem.findByPk(data.id).then(orderItem => {
          expect(data.updatedAt).to.be.not.equal(orderItem.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.OrderItem.destroy({ where: { id: data.id } }).then(() => {
        db.OrderItem.findByPk(data.id).then(orderItem => {
          expect(orderItem).to.be.equal(null)
          done()
        })
      })
    })
  })
})
