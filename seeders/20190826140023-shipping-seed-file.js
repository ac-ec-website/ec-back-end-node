'use strict'

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Shippings',
      [
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 0,
          name: '王大明',
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 1,
          name: '張三寶',
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 2,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 3,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 4,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 5,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 6,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 7,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 8,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 9,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 10,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 11,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 12,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 13,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 14,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 15,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 16,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 17,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 18,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 19,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 20,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 21,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 22,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          sn: null,
          shipping_fee: 60,
          shipping_method: '住家宅配',
          // 0 - 未配送, 1 - 配送中, 2 - 已送達
          shipping_status: 2,
          name: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          OrderId: 23,
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
