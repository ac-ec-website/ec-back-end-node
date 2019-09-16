const stubSession = (req, res, next) => {
  next()
}

module.exports = { stubSession }
