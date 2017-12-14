// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'mdnote-development',
      user: 'andrew',
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
      user:     'andrew',
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

  production: {
    client: 'postgresql',
    connection: {
      database: 'mdnote-prod',
      user:     'mdnote-user',
      password: 'mdnote-mdnote'
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
