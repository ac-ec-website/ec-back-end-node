const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminService = {
  signUp: async (userName, userEmail, userPassword) => {
    const user = await User.findOne({
      where: { email: userEmail }
    })
    if (user) {
      return {
        status: 'error',
        message: '信箱重複！'
      }
    }

    const salt = bcrypt.genSaltSync(10)
    let newUser = await User.create({
      name: userName,
      email: userEmail,
      password: bcrypt.hashSync(userPassword, salt),
      address: '天龍市忠孝東路走九遍87號',
      role: 'user'
    })

    return {
      status: 'success',
      message: '成功註冊帳號！',
      newUser
    }
  },

  signIn: async (userEmail, userPassword) => {
    const user = await User.findOne({
      where: {
        email: userEmail
      }
    })

    if (!user) {
      return {
        status: 'error',
        message: '帳號錯誤'
      }
    }
    if (!bcrypt.compareSync(userPassword, user.password)) {
      return {
        status: 'error',
        message: '密碼錯誤'
      }
    }

    const payload = user.dataValues
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return {
      status: 'success',
      message: 'ok',
      token,
      user
    }
  },

  getUsers: async () => {
    const user = await User.findAll({})
    return user
  },

  putUser: async (userId, userRole) => {
    await User.update({ role: userRole }, { where: { id: userId } })
    const user = await User.findOne({ where: { id: userId } })
    return user
  }
}

module.exports = adminService
