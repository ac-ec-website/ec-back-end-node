'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Discounts',
      [
        {
          id: 1,
          name: '十周年慶',
          description: '周年慶跳樓大折扣',
          target_price: 5000,
          percent: null,
          product_reduce: 1500,
          shipping_free: 1,
          start_date: null,
          end_date: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '聖誕特價',
          description: '聖誕節超划算方案',
          target_price: 1000,
          percent: 80,
          product_reduce: null,
          shipping_free: 0,
          start_date: null,
          end_date: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discounts', null, {})
  }
}
