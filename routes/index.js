const apis = require('./apis.js')
const main = require('./main.js')

module.exports = app => {
  app.use('/', main)
  app.use('/api', apis)
}
