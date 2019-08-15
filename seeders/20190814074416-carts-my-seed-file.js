'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Carts',
      [
        {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
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
