const envConfig = require('./' + (process.env.NODE_ENV || 'development') + '.json');

module.exports = Object.assign({
  "secret": "supersecretthing",
}, envConfig)
