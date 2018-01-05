// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'mdnote-development',
      user: 'mdnoteuser',
      password: null
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'mdnote-test',
      user:     'mdnoteuser',
      password: null
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'mdnote-prod',
      user:     'mdnoteuser',
      password: 'mdnotepass'
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  }

};
