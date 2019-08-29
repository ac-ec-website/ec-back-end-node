'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Carts',
      [
        {
          id: 1,
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          shipping_method: '其他',
          shipping_fee: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {})
  }
}
