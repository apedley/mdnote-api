const envConfig = require('./' + (process.env.NODE_ENV) + '.json');

module.exports = Object.assign({
  "secret": "supersecretthing",
}, envConfig)
