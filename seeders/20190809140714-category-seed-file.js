'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 1,
          name: '汪汪商品',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '喵喵商品',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
