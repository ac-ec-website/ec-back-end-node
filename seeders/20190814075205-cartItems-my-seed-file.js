'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'CartItems',
      [
        {
          quantity: 3,
          CartId: 1,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 5,
          CartId: 1,
          ProductId: 2,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 10,
          CartId: 2,
          ProductId: 3,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 30,
          CartId: 2,
          ProductId: 5,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 8,
          CartId: 3,
          ProductId: 4,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 4,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 5,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 6,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 7,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 8,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 9,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 10,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 11,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 12,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 13,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 14,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 15,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 16,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 17,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 18,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 19,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 20,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 21,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 22,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          quantity: 1,
          CartId: 23,
          ProductId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CartItems', null, {})
  }
}
