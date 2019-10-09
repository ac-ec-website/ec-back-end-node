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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          params: null,
          sn: null,
          total_amount: 12392,
          payment_method: null,
          payment_status: 0, // （0 - 尚未付款, 1 - 已付款）
          OrderId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payments', null, {})
  }
}
