'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '123',
          role: 'admin',
          address: '你家',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'user1',
          email: 'user1@example.com',
          password: '123',
          role: 'user',
          address: '你家',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
