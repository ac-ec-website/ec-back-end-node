'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: '汪汪商品',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '喵喵商品',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
