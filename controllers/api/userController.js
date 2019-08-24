const db = require('../../models')
const User = db.User

const userController = {
  getCurrentUser: async (req, res) => {
    if (req.user) {
      return res.json({
        status: 'success',
        user: req.user
      })
    }
    return res.json({
      status: 'forbidden',
      message: 'No user data',
      user: {}
    })
  }
}

module.exports = userController
