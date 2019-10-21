'use strict'
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: '老闆',
          email: 'root@example.com',
          password: bcrypt.hashSync('123', salt),
          role: 'admin',
          address: '你家',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '員工',
          email: 'staff@example.com',
          password: bcrypt.hashSync('123', salt),
          role: 'admin',
          address: '你家',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: 'user1',
          email: 'user1@example.com',
          password: bcrypt.hashSync('123', salt),
          role: 'user',
          address: '你家',
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
