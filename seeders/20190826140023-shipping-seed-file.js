'use strict'

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Shippings',
      [
        {
          id: 1,
          sn: null,
          shipping_fee: 30,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 0,
          name: '王大明',
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          sn: null,
          shipping_fee: 30,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 1,
          name: '張三寶',
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shippings', null, {})
  }
}
