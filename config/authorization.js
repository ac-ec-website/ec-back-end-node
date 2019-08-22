const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.User

const checkIsLogin = async (req, res, next) => {
  const header = req.headers['authorization']
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]

    req.token = token
  } else {
    return res.json({
      status: 'forbidden',
      message: 'headers 未設定 JWT token'
    })
  }

  try {
    var jwt_payload = jwt.verify(req.token, process.env.JWT_SECRET)
    const user = await User.findByPk(jwt_payload.id)
    req.user = user
    next()
  } catch (err) {
    console.log(err)
    return res.json({
      status: 'forbidden',
      message: '錯誤的 JWT token'
    })
  }
}

const checkIsAdmin = (req, res, next) => {
  if (req.user) {
    console.log(req.user)
    if (req.user.role === 'admin') {
      return next()
    }
    return res.json({ status: 'error', message: '訪問權限不夠' })
  } else {
    return res.json({
      status: 'error',
      message: '請重新登入'
    })
  }
}

module.exports = { checkIsLogin, checkIsAdmin }
