'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      coupon_code: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      percent: {
        type: Sequelize.INTEGER
      },
      product_reduce: {
        type: Sequelize.INTEGER
      },
      shipping_free: {
        type: Sequelize.INTEGER
      },
      limited_num: {
        type: Sequelize.INTEGER
      },
      end_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Coupons')
  }
}
