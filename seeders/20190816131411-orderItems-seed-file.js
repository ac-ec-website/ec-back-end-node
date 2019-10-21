'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'OrderItems',
      [
        {
          quantity: 3,
          price: 460,
          OrderId: 1,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 5,
          price: 520,
          OrderId: 1,
          ProductId: 2,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 10,
          price: 460,
          OrderId: 1,
          ProductId: 3,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 30,
          price: 320,
          OrderId: 2,
          ProductId: 5,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 8,
          price: 349,
          OrderId: 2,
          ProductId: 4,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 3,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 4,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 5,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 6,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 7,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 8,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 9,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 10,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 11,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 12,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 13,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 14,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 15,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 16,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 17,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 18,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 19,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 20,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 21,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          price: 460,
          OrderId: 22,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 15,
          price: 520,
          OrderId: 23,
          ProductId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 12,
          price: 320,
          OrderId: 23,
          ProductId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {})
  }
}
