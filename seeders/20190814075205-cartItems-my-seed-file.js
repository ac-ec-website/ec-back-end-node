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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 5,
          CartId: 1,
          ProductId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 10,
          CartId: 2,
          ProductId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 30,
          CartId: 2,
          ProductId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 8,
          CartId: 3,
          ProductId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CartItems', null, {})
  }
}
