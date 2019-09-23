const adminService = require('../../services/adminService')

const adminController = {
  signUp: async (req, res) => {
    try {
      if (!req.body.name || !req.body.email || !req.body.password || !req.body.passwordCheck) {
        return res.json({
          status: 'error',
          message: '所有欄位都要填寫'
        })
      }
      if (req.body.password !== req.body.passwordCheck) {
        return res.json({
          status: 'error',
          message: '兩次密碼輸入不同！'
        })
      }
      const userName = req.body.name
      const userEmail = req.body.email
      const userPassword = req.body.password
      const { status, message, newUser } = await adminService.signUp(
        userName,
        userEmail,
        userPassword
      )

      return res.json({
        status,
        message,
        user: newUser
      })
    } catch (error) {
      console.log('error', error)
      res.sendStatus(500)
    }
  },

  signIn: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.json({
          status: 'error',
          message: '所有欄位都要填寫'
        })
      }

      const userEmail = req.body.email
      const userPassword = req.body.password
      const { status, message, token, user } = await adminService.signIn(userEmail, userPassword)

      return res.json({
        status,
        message,
        token,
        user
      })
    } catch (error) {
      console.log('error', error)
      res.sendStatus(500)
    }
  },

  getUsers: async (req, res) => {
    try {
      const user = await adminService.getUsers()
      return res.json({
        user
      })
    } catch (error) {
      console.log('error', error)
      res.sendStatus(500)
    }
  },

  putUser: async (req, res) => {
    try {
      if (!req.body.id || !req.body.role) {
        return res.json({
          status: 'error',
          message: 'Cannot find id and role'
        })
      }

      const userId = req.body.id
      const userRole = req.body.role
      const user = await adminService.putUser(userId, userRole)

      return res.json({
        user
      })
    } catch (error) {
      console.log('error', error)
      res.sendStatus(500)
    }
  }
}

module.exports = adminController
