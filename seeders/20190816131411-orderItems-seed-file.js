'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'OrderItems',
      [
        {
          id: 1,
          quantity: 4,
          price: 800,
          OrderId: 1,
          ProductId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          quantity: 6,
          price: 1200,
          OrderId: 1,
          ProductId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          quantity: 2,
          price: 500,
          OrderId: 2,
          ProductId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          quantity: 8,
          price: 2000,
          OrderId: 2,
          ProductId: 6,
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
