'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Categories',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 'CategoryId')
  }
}
