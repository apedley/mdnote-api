// Update with your config settings.

module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      database: 'travis_ci_test',
      user:     'postgres',
      password: null
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: __dirname + '/db/migrations/test'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },


};
