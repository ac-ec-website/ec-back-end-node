const db = require('../../models')
const User = db.User

const userController = {
  getCurrentUser: async (req, res) => {
    try {
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
    } catch (error) {
      console.log('getCurrentUser error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = userController
