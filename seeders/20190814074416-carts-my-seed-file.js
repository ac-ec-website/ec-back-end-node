'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Carts',
      [
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '其他',
          shipping_fee: 100,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          shipping_method: '住家宅配',
          shipping_fee: 60,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {})
  }
}
