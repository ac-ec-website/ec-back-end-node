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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 5,
          price: 520,
          OrderId: 1,
          ProductId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 10,
          price: 460,
          OrderId: 1,
          ProductId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 30,
          price: 320,
          OrderId: 2,
          ProductId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          quantity: 8,
          price: 349,
          OrderId: 2,
          ProductId: 4,
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
