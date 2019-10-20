'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Payments',
      [
        {
          params: null,
          sn: null,
          total_amount: 8580,
          payment_method: null,
          payment_status: 0, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 12392,
          payment_method: null,
          payment_status: 0, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 2,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 3,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 4,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 5,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 6,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 7,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 8,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 9,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 10,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 11,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 12,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 13,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 14,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 15,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 16,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 17,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 18,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 19,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 20,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 21,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          params: null,
          sn: null,
          total_amount: 460,
          payment_method: 'CREDIT',
          payment_status: 1, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 22,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payments', null, {})
  }
}
