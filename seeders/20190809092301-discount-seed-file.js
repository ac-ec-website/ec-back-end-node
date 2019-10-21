'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Discounts',
      [
        {
          type: 0,
          name: '九月中秋節特惠',
          description: '中秋免運',
          target_price: 450,
          percent: null,
          product_reduce: null,
          shipping_free: 1,
          start_date: '2019-09-01T00:00:00',
          end_date: '2019-10-01T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          type: 1,
          name: '十周年慶',
          description: '周年慶跳樓大折扣',
          target_price: 5000,
          percent: null,
          product_reduce: 1500,
          shipping_free: null,
          start_date: '2019-09-01T00:00:00',
          end_date: '2019-11-20T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          type: 2,
          name: '聖誕特價',
          description: '聖誕節超划算方案',
          target_price: 1000,
          percent: 80,
          product_reduce: null,
          shipping_free: null,
          start_date: '2019-09-01T00:00:00',
          end_date: '2019-11-20T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          type: 0,
          name: '聖誕老公公到你家',
          description: '聖誕節配送方案',
          target_price: 500,
          percent: null,
          product_reduce: null,
          shipping_free: 1,
          start_date: '2019-09-01T00:00:00',
          end_date: '2019-11-20T13:00:00',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discounts', null, {})
  }
}
