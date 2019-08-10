const apis = require('./apis.js');

module.exports = app => {
  app.use('/api', apis);
};