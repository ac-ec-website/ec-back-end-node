var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const OrderItemModel = require('../../models/orderitem')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# OrderItem Model', () => {
  const OrderItem = OrderItemModel(sequelize, dataTypes)
  const orderItem = new OrderItem()

  checkModelName(OrderItem)('OrderItem')

  context('properties', () => {
    ;['price', 'quantity'].forEach(checkPropertyExists(orderItem))
  })
})
