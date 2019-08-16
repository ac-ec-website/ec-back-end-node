'use strict'

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Orders',
      [
        {
          id: 1,
          name: 'Wanaka',
          sn: faker.random.number(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          total_amount: 2000,
          shipping_status: 0,
          payment_status: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Jerry',
          sn: faker.random.number(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          total_amount: 2500,
          shipping_status: 0,
          payment_status: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  }
}
